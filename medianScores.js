//binary search, which returns position for the new element
function binarySearchForInsertion(arr, valueForInsertion, start, end) {
    var mid = Math.floor((start + end) / 2);

    if (start > end) {
        //doesn't matter if the value is duplicate
        if (start > arr.length) return arr.length;
        return start;
    } else if (valueForInsertion == arr[mid]) {
        return mid;
    } else if (valueForInsertion < arr[mid]) {
        return binarySearchForInsertion(arr, valueForInsertion, start, mid - 1)
    } else {
        return binarySearchForInsertion(arr, valueForInsertion, mid + 1, end);
    }
}

function insertIntoSortedArray(arr, valueToInsert) {
    arr.splice(binarySearchForInsertion(arr, valueToInsert, 0, arr.length), 0, valueToInsert);
}

function calcMedian(scoresArr) {
    if (scoresArr.length == 0) return [];

    //get first element and push it directly into the res array
    //no logic needed for first element
    //keep this array always sorted
    let helperArr = new Array(1).fill(scoresArr[0]);
    let resultArr = [...helperArr];

    var med;
    for (let i = 1; i < scoresArr.length; i++) {
        //insert element in an efficient manner within a sorted array - O(n)
        insertIntoSortedArray(helperArr, scoresArr[i]);

        //slower approach - use Array.push() and then Array.sort() instead of binary search implementation
        //helperArr.push(scoresArr[i]);
        //helperArr.sort((a,b)=>a-b);

        var midIndx = Math.floor(i / 2);
        if (i % 2 == 0) {
            //round number to nearest integer
            med = Math.round(helperArr[midIndx]);
        } else {
            //round number to nearest integer
            med = Math.round((helperArr[midIndx] + helperArr[midIndx + 1]) / 2);
        }
        resultArr.push(med);
    }
    return resultArr;
}

// Example test case:
// scores = [100, 20, 50, 70, 45];
// console.log("Median array for", scores, "is", calcMedian(scores));

// Test case for a 100 random scores (from 0 to 100)
// scores = [...new Array(100)].map(el => Math.random()*100);
// console.log("Median array for", scores, "is", calcMedian(scores));

// Test case for single element
// scores = [10];
// console.log("Median array for", scores, "is", calcMedian(scores));

//Test case for empty array
// scores = [];
// console.log("Median array for", scores, "is", calcMedian(scores));