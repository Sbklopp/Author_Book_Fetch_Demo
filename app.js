
//**REMEMBER TO ADD JQUERY TO SCRIPT SRC IN YOUR HTML DOC**

// This function retrieves an author with id 3
async function getAuthor() {
    let url = `https://localhost:7173/api/author/3`;
    try {
        let res = await fetch(url);
        return await(res.json());
    } catch (error) {
        console.log(error);
    }
}

//This function uses Jquery to append the author's name to the "author" div
async function addAuthorName() {
    await fetch(`https://localhost:7173/api/author/3`)
      .then((response) => {
      return response.json();
      })
      .then((json) => { 
        $("#author").append(`
          <div>
          <h1> ${json.name} </h1>
          <br>
          <h1> Book Details </h1>
          </div>
          <hr>
        `)
      })
}
addAuthorName()

//We use the getAuthor function to retrieve the author object and then we query an endpoint
// that lets us retrieve all books with a specific author id
// NOTE you will have to create this endpoint in your rest application
async function addbookdetails() {
    let bookids = [];
    let author = await getAuthor();
    console.log(author.id)
    await fetch(`https://localhost:7173/api/book/author/${author.id}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => { 
        for (i = 0; i < json.length; i++) {
          //here we loop through the book objects returned and for each one we use Jquery
          // to append the appropriate information to the "book" div
          $("#book").append(
            "<div>" + 
              "<h6> Name : " +
              json[i].name +
              "</h6>" +
              "<h6> Genre : " +
              json[i].genre +
              "</h6>" +
              "<h6> Pages : " +
              json[i].pages +
              "</h6>" +
              "<h6> ID :" +
              json[i].id +
              "</h6>" +
              "<hr>"
          );
          //finally we add the book id's to a list that we could continue to loop through if we wanted to display
          //the fields of another model with a relationship to books
          bookids.push(json[i].id);
        }        
      });
}

addbookdetails()



