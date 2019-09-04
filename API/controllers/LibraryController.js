const { verifyJWT_MW } = require('../middlewares');
const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const { db } = require('../libs/firebase');

router.all('*', verifyJWT_MW);

router.post('/', (req, res) => {
    const addBooksArr = req.body.books;
    for (let i = 0; i < addBooksArr.length; i++) {
        let addBook = addBooksArr[i];
        db.collection("library").add(addBook)
        .then(() => {
            return res.status(200).send(addBooksArr);
        })
        .catch(function(error) {
            return res.status(500).send(error);
        });
    }
});

router.put('/update/:id', (req, res) => {
    db.collection("library").doc(req.params.id).set(req.body,{merge:true}) 
    .then(function() {
        return res.status(200).send("Your book has been edited.");
    })
    .catch(function(error) {
        return res.status(500).send(error);
    });
});

router.get('/random', (req, res) => {
    let allBooksArr = [];
    db.collection('library')
    .get()
    .then((library) => {
        let size = Number(library.size);
        library.forEach(function(doc) {
            let book = doc.data();
            book.id = doc.id;
            allBooksArr.push(book);
        });
        let randomBookIndex = getRandomInt(size);
        let randomBook = allBooksArr[randomBookIndex];
        return res.status(200).send(randomBook);
     })
     .catch(function(error) {
        return res.status(500).send(error);
    });
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

router.get('/searchBy/', (req, res) => {
    let foundBooksArr = [];
    if (req.query.author && req.query.title) {
        db.collection("library").where("title", "==", req.query.title).where("author", "==", req.query.author)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let book = doc.data();
                book.id = doc.id;
                foundBooksArr.push(book);
            });
            return res.status(200).send(foundBooksArr);
        })
        .catch(function(error) {
            return res.status(500).send(error);
        });
    } else if (req.query.author && !req.query.title) {
        db.collection("library").where("author", "==", req.query.author)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let book = doc.data();
                book.id = doc.id;
                foundBooksArr.push(book);
            });
            return res.status(200).send(foundBooksArr);
        })
        .catch(function(error) {
            return res.status(500).send(error);
        });
    } else if (!req.query.author && req.query.title) {
        db.collection("library").where("title", "==", req.query.title)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let book = doc.data();
                book.id = doc.id;
                foundBooksArr.push(book);
            });
            return res.status(200).send(foundBooksArr);
        })
        .catch(function(error) {
            return res.status(500).send(error);
        });
    }
});

router.get('/totalCount', (req, res) => {
    db.collection('library')
    .get()
    .then(library => {
        let size = Number(library.size);
        return res.send({length: size}); 
     })
     .catch(function(error) {
        return res.status(500).send(error);
    });
});

router.get('/:numResults/', (req, res) => {
    let allBooksArr = [];
    let numResults = Number(req.params.numResults);
    db.collection('library')
    .limit(numResults)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            let book = doc.data();
            book.id = doc.id;
            allBooksArr.push(book);
        });
        return res.status(200).send(allBooksArr); 
    })
    .catch(function(error) {
        return res.status(500).send(error);
    });
});

router.delete('/deleteBy/', (req, res) => { 
    const deletedBooks = [];
    if (req.query.author && req.query.title) {
        db.collection("library").where("title", "==", req.query.title).where("author", "==", req.query.author)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                db.collection("library").doc(doc.id).delete()
                .then(function() {
                    console.log("Document successfully deleted!");
                })
                .catch(function(error) {
                    console.log("Error deleting document: ", error);
                })
                deletedBooks.push(doc.data());
            })
            return res.status(200).send(deletedBooks); 
        })
        .catch(function(error) {
            return res.status(500).send(error);
        });
    } else if (req.query.author && !req.query.title) {
        db.collection("library").where("author", "==", req.query.author)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                db.collection("library").doc(doc.id).delete()
                .then(function() {
                    console.log("Document successfully deleted!");
                })
                .catch(function(error) {
                    console.log("Error deleting document: ", error);
                })
                deletedBooks.push(doc.data());
            })
            return res.status(200).send(deletedBooks); 
        })
        .catch(function(error) {
            return res.status(500).send(error);
        });
    } else if (!req.query.author && req.query.title) {
        db.collection("library").where("title", "==", req.query.title)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                db.collection("library").doc(doc.id).delete()
                .then(function() {
                    console.log("Document successfully deleted!");
                })
                .catch(function(error) {
                    console.log("Error deleting document: ", error);
                })
                deletedBooks.push(doc.data());
            })
            return res.status(200).send(deletedBooks); 
        })
        .catch(function(error) {
            return res.status(500).send(error);
        });
    }
});

router.delete('/deleteById/:id', (req, res) => {
    db.collection("library").doc(req.params.id).delete()
    .then(function() {
        return res.status(200).send({bookId: req.params.id});
    })
    .catch(function(error) {
        return res.status(500).send(error);
    });
});

module.exports = router;