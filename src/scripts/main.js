'use strict';

/**
 * Handle negative column index for row
 *
 * @param {Element} row
 * @param {integer} index
 * @return {integer}
 */
function handleNegativeColIndex(row, index) {
  return index >= 0 ? index : row.cells.length + index;
}

/**
 * Clone column that has sourceIndex of table
 * and insert it after one that has targetIndex
 *
 * @param {string} tableQuery
 * @param {integer} sourceIndex
 * @param {integer} targetIndex
 *
 * @return void
 */
function formTable(tableQuery, sourceIndex, targetIndex) {
  const rows = document.querySelectorAll(tableQuery + ' tr');

  // we will get empty rows for empty search result, so skip any checks
  rows.forEach((row) => {
    /**
     * We're checking this into cycle - because
     * 1. we do not know anything about td span=x
     * 2. we do not provide correct implementation for colspan
     * 4. we skipped situation when there replacement is not needed
     * 5. we checked boundaries
     * 6. for negative index values - we add length of row (backward order)
     */

    // handle negative indexes
    const srcIdx = handleNegativeColIndex(row, sourceIndex);
    const trgIdx = handleNegativeColIndex(row, targetIndex);

    if (srcIdx === trgIdx) {
      return;
    }

    if (srcIdx >= row.cells.length) {
      return;
    }

    // we're about to insert new on last position - so check without "-1"
    if (trgIdx >= row.cells.length) {
      return;
    }

    // deep clone

    const clonedCell = row.cells[srcIdx].cloneNode(true);

    // insert cloned, || null - insert at the end

    row.insertBefore(clonedCell, row.cells[trgIdx + 1] || null);
  });
}

const query = 'table';

formTable(query, 1, -1);
