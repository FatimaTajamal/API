 // Function to display items
 function displayItems() {
    $.ajax({
        url: 'https://api.example.com/items',
        type: 'GET',
        success: function(data) {
            const itemsList = $('#items-list');
            itemsList.empty(); // Clear the existing list

            data.forEach(function(item) {
                itemsList.append(`<li>${item.name}: ${item.description}</li>`);
            });
        },
        error: function(error) {
            console.error('Error fetching items:', error);
        }
    });
}

// Create Form Submission
$('#create-form').on('submit', function(event) {
    event.preventDefault();
    const name = $('#create-name').val();
    const description = $('#create-description').val();
    $.ajax({
        url: 'https://api.example.com/items',
        type: 'POST',
        data: { name, description },
        success: function(data) {
            console.log('Item created:', data);
            displayItems();
        },
        error: function(error) {
            console.error('Error creating item:', error);
        }
    });
});

// Update Form Submission
$('#update-form').on('submit', function(event) {
    event.preventDefault();
    const id = $('#update-id').val();
    const name = $('#update-name').val();
    const description = $('#update-description').val();
    $.ajax({
        url: `https://api.example.com/items/${id}`,
        type: 'PUT', // or 'PATCH' for a partial update
        data: { name, description },
        success: function(data) {
            console.log('Item updated:', data);
            displayItems();
        },
        error: function(error) {
            console.error('Error updating item:', error);
        }
    });
});

// Delete Form Submission
$('#delete-form').on('submit', function(event) {
    event.preventDefault();
    const id = $('#delete-id').val();
    $.ajax({
        url: `https://api.example.com/items/${id}`,
        type: 'DELETE',
        success: function() {
            console.log('Item deleted');
            displayItems();
        },
        error: function(error) {
            console.error('Error deleting item:', error);
        }
    });
});

// Initial display of items
displayItems();
