
$(document).ready(function() {
    getAllPosts();
});

function getAllPosts() {
    $.ajax({
        url: 'https://my-json-server.typicode.com/typicode/demo/posts',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            displayPosts(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

// Function to display posts in a table
function displayPosts(posts) {
    var postList = $('#post-list');
    postList.empty();
    posts.forEach(function (post) {
        postList.append(`
            <tr>
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.body}</td>
                <td>
                    <button onclick="editPost(${post.id})">Edit</button>
                    <button onclick="deletePost(${post.id})">Delete</button>
                </td>
            </tr>
        `);
    });
}

// Function to create a new post
$('#post-form').submit(function (event) {
    event.preventDefault();
    var title = $('#title').val();
    var body = $('#body').val();

    $.ajax({
        url: 'https://my-json-server.typicode.com/typicode/demo/posts',
        method: 'POST',
        dataType: 'json',
        data: { title: title, body: body },
        success: function () {
            getAllPosts();
            $('#title').val('');
            $('#body').val('');
        },
        error: function (error) {
            console.log(error);
        }
    });
});


function editPost(id) {
    var newTitle = prompt("Enter the new title:");
    if (newTitle === null || newTitle === "") {
        return; 
    }

    var newBody = prompt("Enter the new body:");
    if (newBody === null || newBody === "") {
        return; 
    }

    $.ajax({
        url: `https://my-json-server.typicode.com/typicode/demo/posts/${id}`,
        method: 'PUT',
        dataType: 'json',
        data: { title: newTitle, body: newBody },
        success: function () {
            
            $("#post-list tr").each(function () {
                if ($(this).find("td:first").text() === id.toString()) {
                    $(this).find("td:nth-child(2)").text(newTitle); 
                    $(this).find("td:nth-child(3)").text(newBody); 
                }
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}


function deletePost(id) {
    if (confirm("Are you sure you want to delete this post?")) {
        $.ajax({
            url: `https://my-json-server.typicode.com/typicode/demo/posts/${id}`,
            method: 'DELETE',
            success: function () {
                alert(`Post ${id} has been deleted.`);
        
                $("#post-list tr").each(function () {
                    if ($(this).find("td:first").text() === id.toString()) {
                        $(this).remove();
                    }
                });
            },
            error: function (error) {
                console.log(error);
                alert(`Failed to delete post ${id}.`);
            }
        });
    }
}

