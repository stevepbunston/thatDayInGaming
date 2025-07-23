document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('myForm').addEventListener('submit', function (e) {
        var content = tinymce.get('mytextarea').getContent();
        if (!content || content.trim() === '') {
            alert('Description is required.');
            e.preventDefault(); // Prevent form submission
        }
    });
});