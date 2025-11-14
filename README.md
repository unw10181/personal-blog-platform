#SBA 5 project

## Reflection

I built this small blog to practice DOM manipulation and state persistence. The main challenge was making the edit flow feel natural while reusing the same form for create and update. I handled this by tracking a simple `editingId` and toggling the form heading and buttons. If I had more time I'd add markdown support, better timestamps, and a small search/filter UI.

The known issues in program were.

- No rich-text/markdown support.
- No user authentication — posts stored only in the browser.
- Could add a confirmation toast instead of `confirm()` for deletes.
- Add "updated at" display for edited posts.

Uchenna Williams
