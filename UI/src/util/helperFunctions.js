export function sortBooksById(books) {
  return books.sort((a, b) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  });
}

export function sanitizeBookData(bookArr) {
  var regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  let validatedBooksArr = [];
  const bookDisposalArr = [];
  const bookProperties= ['author','numPages','pubDate','rating','synopsis','title','user'];
  for (let i = 0; i < bookArr.length; i++) {
    if (!(hasAllProperties(bookArr[i],bookProperties))) {
      bookDisposalArr.push(bookArr[i]);
    } else {
      bookArr[i].author = String(bookArr[i].author);
      bookArr[i].cover = "";
      bookArr[i].id = String(bookArr[i].id);
      bookArr[i].numPages = String(bookArr[i].numPages);
      bookArr[i].rating = String(bookArr[i].rating);
      bookArr[i].synopsis = String(bookArr[i].synopsis);
      bookArr[i].user = String(bookArr[i].user);
      var dateObj = new Date(bookArr[i].pubDate);
      
      if (regex.test(dateObj)) {
        bookArr[i].pubDate = String(dateObj);
        validatedBooksArr.push(bookArr[i]);
      } else if ((dateObj.toString()) !== "Invalid Date") {
        if ((dateObj.getMonth() + 1) < 10) {
          var month = `0${dateObj.getMonth() + 1}`;
        } else {
          month = ((dateObj.getMonth()) + 1);
        }
        if (dateObj.getDate() < 10) {
          var date = `0${dateObj.getDate()}`;
        } else {
          date = dateObj.getDate();
        }
        let newDateFormat = `${dateObj.getFullYear()}-${month}-${date}`;
        bookArr[i].pubDate = newDateFormat;
        validatedBooksArr.push(bookArr[i]);
      } else if (bookArr[i].pubDate === "") {
        bookArr[i].pubDate = "";
        validatedBooksArr.push(bookArr[i]);
      } else {
        bookDisposalArr.push(bookArr[i]);
      }
    }
  }
  return validatedBooksArr;
}

export function hasAllProperties(obj, props) {
  for (let i = 0; i < props.length; i++) {
      if (!obj.hasOwnProperty(props[i]))
          return false;
  }
  return true;
}

export function unique(array) {
  return array.filter((e, i, arr) => arr.indexOf(e) === i);
}