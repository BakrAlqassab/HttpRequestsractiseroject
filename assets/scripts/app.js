const listElements = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
// Post section

const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");

function sendHttpRequest(method, url, data) {
  //   const promise = new Promise((resolve, reject) => {
  // const xhr = new XMLHttpRequest();
  // xhr.setRequestHeader('Content-Type','application/json')
  // xhr.open(mrthod, url);

  // xhr.responseType = "json";

  // // xhr.addEventListener

  // xhr.onload = function () {
  //   if (xhr.status >= 200 && xhr.status < 300) {
  //     // const listOfPosts = JSON.parse( xhr.response);
  //     resolve(xhr.response);
  //   } else {
  //     reject(new Error("Something went Wrong"));
  //   }
  // };
  // xhr.onerror = function () {
  //   //   console.log(xhr.response);
  //   //   console.log(xhr.status);

  //   reject(newError("Failed to send request"));
  // };
  // xhr.send(JSON.stringify(data));

  // Modern javascript
  // Try using json trpe nad fromData
  return fetch(url, {
    method: method,
    // body: JSON.stringify(data),
    body: data,
    // headers: {
    //   "Content-Type": "application/json",
    // },
  })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return response.json().then((errData) => {
          console.log(errData);
          throw new Error("Something went wrong __ Server side ");
        });
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Something went wrong!");
    });
  //   });
  //   return promise;
}

async function fetchPosts() {
  try {
    // const responseData = await sendHttpRequest(

        // Using axios library
    const response = await axios.get(
    //   "GET",
      "https://jsonplaceholder.typicode.com/posts"
    );

    const listOfPosts = response.data;
    //   console.log(listOfPosts);
    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector("li").id = post.id;
      listElements.append(postEl);
    }
  } catch (error) {
    alert(error.message);
    console.log(error.response);
  }
}
async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  // Trying Form Data instead of json,the main benifit of fd is can send files || pictures too
  //If the Api want use json you can't use this method
  const formdata = new FormData(form);
  //   formdata.append('title',title);
  //   formdata.append('body',content);
  formdata.append("userId", userId);
  //   formdata.append('somefile',somefile|| picture.png);
//   sendHttpRequest(
    axios.post(
    // "POST",
    "https://jsonplaceholder.typicode.com/posts",
    formdata
  );
}
fetchButton.addEventListener("click", fetchPosts);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const enteredTitle = event.currentTarget.querySelector("#title").value;
  const enteredContent = event.currentTarget.querySelector("#content").value;
  createPost(enteredTitle, enteredContent);
});
// fetchPosts();
postList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    // console.log('Clicked on button');

    const postId = event.target.closest("li").id;
    console.log(postId);
    // sendHttpRequest(
        axios.delete(
    //   "DELETE",
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }
});
