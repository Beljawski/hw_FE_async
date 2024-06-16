// Напишите функцию getTodos(username), которая в качестве аргумента принимает никнейм пользователя (api /users) и выводит список его задач (api /todos).
// В качестве ответа в консоль выведите массив с задачами указанного пользователя

async function getTodos(username) {
  let userUrl = "https://jsonplaceholder.typicode.com/users";
  let response = await fetch(userUrl);
  let data = await response.json();
  let findUser = data.find((elem) => elem.username === username);
  let idUser = findUser.id;
  let todosUrl = "https://jsonplaceholder.typicode.com/todos";
  let responseTodos = await fetch(todosUrl);
  let todos = await responseTodos.json();
  let userTodos = todos
    .filter((elem) => elem.userId === idUser)
    .reduce((acc, elem) => {
      acc.push(elem.title);
      return acc;
    }, []);
  return userTodos;
}

getTodos("Samantha")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

// Напишите функцию getСomments(title), которая в качестве аргумента принимает заголовок поста (api /posts) и выводит список всех его комментариев (api /comments).
// В качестве ответа в консоль выведите массив с комментариями. Если у заданного поста комментариев нет, выведите в консоль соответствующее сообщение.

async function getComments(title) {
  try {
    let postsUrl = "https://jsonplaceholder.typicode.com/posts";
    let response = await fetch(postsUrl);
    let posts = await response.json();
    let postFind = posts.find((elem) => elem.title === title);
    if (!postFind) {
      console.log("post not found");
    }
    let postId = postFind.id;
    let commentsUrl = "https://jsonplaceholder.typicode.com/comments";
    let responseComments = await fetch(commentsUrl);
    let comments = await responseComments.json();
    let result = comments
      .filter((elem) => elem.postId === postId)
      .map((elem) => elem.body);
    if (result.length === 0) {
      console.log("This post has no comments.");
    }
    return result;
  } catch (error) {
    console.error(error.message);
    console.log("This post has no comments.");
  }
}

getComments("dolorem eum magni eos aperiam quia")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error;
    console.log("у заданного поста комментариев нет");
  });

// Напишите функцию getPhotoByNickName(username), которая в качестве аргумента принимает никнейм пользователя (api /users) и выводит все его фотографии (api /photos). В качестве ответа выведите в консоль массив со всеми фотографиями указанного пользователя.
async function getPhotoByNickName(username) {
  try {
    let userUrl = "https://jsonplaceholder.typicode.com/users";
    let response = await fetch(userUrl);
    let data = await response.json();
    let findUser = data.find((elem) => elem.username === username);
    let idUser = findUser.id;
    if (!findUser) {
      throw new Error(`User with username "${username}" not found`);
    }
    let albumsUrl = "https://jsonplaceholder.typicode.com/albums";
    let responseAlbum = await fetch(albumsUrl);
    let albums = await responseAlbum.json();
    let userAlbums = albums.filter((elem) => elem.userId === idUser);
    let userAlbumsId = userAlbums.map((elem) => elem.id);
    let photosUrl = "https://jsonplaceholder.typicode.com/photos";
    let responsePhotos = await fetch(photosUrl);
    let photos = await responsePhotos.json();
    let userPhotos = photos.filter((photo) =>
            userAlbumsId.includes(photo.albumId)
            );
            if (userPhotos.length === 0) {
            console.log(`User with username ${username} has no photos`);
            } else {
            console.log(userPhotos);
            }} 
 catch {
        (error) => console.log(error);
    }
}
getPhotoByNickName("Samantha")
  .then((result) => console.log(result))
  .catch((error) => {
    console.log(error);
  });
