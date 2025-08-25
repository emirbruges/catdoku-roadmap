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
				return true;
			} else {
				currentSelectedCell.classList.add("error");
				return false;
			}
		} else {
			currentSelectedCell.classList.remove("error");
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

	// With using things like: sudokuCellElements[27].parentElement.children[3];
	// we can get the exact position and iterate from a specific row. the only problem would be to iterate from columns to columns, ill figure out that tomorrow anyway. Good luck, i hope you still have the things i had in mind for this project <3.
});
