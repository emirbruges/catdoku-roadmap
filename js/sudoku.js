document.addEventListener("DOMContentLoaded", () => {
	// Sudoku things
	const gridElement = document.querySelector(".grid");
	const sudokuCellElements = document.querySelectorAll('[class^="column-"]');
	const sudokuParentElement = document.querySelector(".sudoku");

	const sudoku = [
		[6, 1, 9, 5, 4, 2, 3, 7, 8],
		[2, 7, 8, 6, 9, 3, 1, 5, 4],
		[4, 5, 3, 1, 7, 8, 2, 6, 9],
		[7, 9, 1, 2, 5, 4, 8, 3, 6],
		[3, 8, 4, 7, 6, 1, 5, 9, 2],
		[5, 2, 6, 3, 8, 9, 4, 1, 7],
		[1, 4, 2, 9, 3, 7, 6, 8, 5],
		[9, 3, 5, 8, 2, 6, 7, 4, 1],
		[8, 6, 7, 4, 1, 5, 9, 2, 3],
	];

	// Timers
	let hideNotificationTimer = null;

	// Number things
	const selectNumberElements = document.querySelectorAll(".number");

	function deselectPreviousCell() {
		selectedCells = sudokuParentElement.querySelectorAll(".selected");
		selectedCells.forEach((element) => {
			element.classList.toggle("selected");
		});
		selectedCells = sudokuParentElement.querySelectorAll(".main-selected");
		selectedCells.forEach((element) => {
			element.classList.toggle("main-selected");
		});
		selectedCells =
			sudokuParentElement.querySelectorAll(".selected-shadow");
		selectedCells.forEach((element) => {
			element.classList.toggle("selected-shadow");
		});
	}

	function selectAllNumbers(firstElement) {
		if (firstElement.innerText != "") {
			firstElement.classList.add("main-selected");
			Array.from(sudokuCellElements)
				.filter((item) => {
					return item.innerText === firstElement.innerText;
				})
				.forEach((element) => {
					element.classList.add("selected");
				});
		} else {
			firstElement.classList.add("selected");
			firstElement.classList.add("main-selected");
		}
	}

	function selectAllShadows(firstElement) {
		// Rows
		const rowElements = Array.from(firstElement.parentElement.children);
		const elementsWithoutInitial = rowElements.filter((item) => {
			return item != firstElement;
		});
		elementsWithoutInitial.forEach((element) => {
			element.classList.toggle("selected-shadow");
		});

		// Columns
		const columnName = firstElement.classList[0];
		const columnElementsWoInitial = Array.from(sudokuCellElements).filter(
			(item) => {
				return item.classList[0] == columnName && item != firstElement;
			},
		);
		columnElementsWoInitial.forEach((element) => {
			element.classList.toggle("selected-shadow");
		});
	}

	function setEditDelNumber(number) {
		currentSelectedCell = document.querySelector(".selected.main-selected");
		if (currentSelectedCell) {
			cellFilledByUser = Array.from(currentSelectedCell.classList).filter(
				(item) => {
					return item == "user-number";
				},
			);
			if (currentSelectedCell.innerText == "" || cellFilledByUser[0]) {
				if (number.innerText != "") {
					currentSelectedCell.innerText = number.innerText;
					currentSelectedCell.classList.add("user-number");
					deselectPreviousCell();
					selectAllNumbers(currentSelectedCell);
					selectAllShadows(currentSelectedCell);
				} else {
					currentSelectedCell.innerText = number.innerText;
					currentSelectedCell.classList.remove("user-number");
					deselectPreviousCell();
					selectAllNumbers(currentSelectedCell);
					selectAllShadows(currentSelectedCell);
				}
			}
		}
	}

	function showNotification() {
		const notificationElement = document.createElement("div");
		notificationElement.className = "notification notification__show";
		notificationElement.id = "notification";
		notificationElement.innerHTML = `<svg
				version="1.1"
				class="notification__warning"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				x="0px"
				y="0px"
				viewBox="0 0 416.979 416.979"
				style="enable-background: new 0 0 416.979 416.979"
				xml:space="preserve"
			>
				<g>
					<path
						d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85 c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786 c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576 c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765 c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"
					/>
				</g>
			</svg>
			<p>That is not the number... :(</p>
			<button class="notification-btn-undo">Undo?</button>
			<div id="notification-close" class="notification__close">
				<svg
					version="1.1"
					class="ntfction__close"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					x="0px"
					y="0px"
					viewBox="0 0 356.218 356.218"
					style="enable-background: new 0 0 356.218 356.218"
					xml:space="preserve"
				>
					<g>
						<path
							d="M350.676,261.501c7.388,7.389,7.388,19.365,0.001,26.754l-62.421,62.421c-7.39,7.389-19.366,7.387-26.755,0l-83.392-83.394 l-83.395,83.394c-7.386,7.388-19.364,7.387-26.752,0L5.541,288.254c-7.388-7.388-7.387-19.364,0.001-26.75l83.395-83.395 L5.543,94.715c-7.387-7.387-7.387-19.365-0.001-26.751L67.965,5.542c7.387-7.388,19.365-7.387,26.75,0l83.395,83.395l83.393-83.395 c7.388-7.387,19.364-7.388,26.753,0l62.422,62.421c7.387,7.388,7.388,19.366,0,26.753l-83.395,83.393L350.676,261.501z"
						/>
					</g>
				</svg>
			</div>
`;

		document.body.appendChild(notificationElement);

		// Notification things
		closeNotificationElement = document.querySelector(
			"#notification-close",
		);
		undoNotificationButton = document.querySelector(
			".notification-btn-undo",
		);

		// Notiffication actions (to do: 1/2)
		closeNotificationElement.addEventListener("click", () => {
			hideNotification();
		});
		undoNotificationButton.addEventListener("click", () => {
			console.log(
				"You clicked the undo button! (is the animation working correctly yet ? if so, come make the logic for the button. :D)",
			);
		});

		hideNotificationTimer = setTimeout(() => {
			hideNotification();
		}, 5000);
	}

	function hideNotification() {
		notificationElement = document.querySelector("#notification");
		if (notificationElement) {
			notificationElement.classList.remove("notification__show");
			notificationElement.classList.add("notification__hide");
			setTimeout(() => {
				if (
					!Array.from(notificationElement.classList).filter(
						(item) => {
							return item == "notification__show";
						},
					)[0]
				) {
					notificationElement.remove();
				}
			}, 400);
		}
	}

	function forceHideNotification() {
		if (hideNotificationTimer) {
			clearTimeout(hideNotificationTimer);
			hideNotificationTimer = null;
		}
		notificationElement = document.querySelector("#notification");
		if (notificationElement) {
			notificationElement.remove();
		}
	}

	function checkSudokuPosition() {
		currentSelectedCell = document.querySelector(".selected.main-selected");
		if (currentSelectedCell.innerText != "") {
			currentColumn =
				Array.from(currentSelectedCell.classList).filter((item) => {
					return item.startsWith("column-");
				})[0][7] - 1;
			currentRow =
				Array.from(currentSelectedCell.parentElement.classList).filter(
					(item) => {
						return item.startsWith("row-");
					},
				)[0][4] - 1;
			if (
				sudoku[currentRow][currentColumn] ==
				currentSelectedCell.innerText
			) {
				currentSelectedCell.classList.remove("error");
				forceHideNotification();
				return true;
			} else {
				currentSelectedCell.classList.add("error");
				showNotification();
				return false;
			}
		} else {
			currentSelectedCell.classList.remove("error");
			forceHideNotification();
			return true;
		}
	}

	// Events / Actions

	// If you click outside the numbers or the sudoku.
	gridElement.addEventListener("click", (event) => {
		if (event.target == gridElement) {
			deselectPreviousCell();
		}
	});

	// For each cell on the sudoku wait for a click to select it.
	sudokuCellElements.forEach((element) => {
		element.addEventListener("click", () => {
			deselectPreviousCell();
			selectAllNumbers(element);
			selectAllShadows(element);
		});
	});

	// Set, edit or delete the number in the selected cell trough the numbers on the right.
	selectNumberElements.forEach((element) => {
		element.addEventListener("click", () => {
			setEditDelNumber(element);
			checkSudokuPosition();
		});
	});
});
