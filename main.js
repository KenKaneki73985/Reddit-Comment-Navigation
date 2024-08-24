// ==UserScript==
// @name         REDDIT: Comment Navigation
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Navigate between parent comments on Reddit
// @author       Ken Kaneki (https://github.com/KenKaneki73985/Reddit-Comment-Navigation)
// @match        https://www.reddit.com/*
// @grant        none
// ==/UserScript==

//  user_script = "moz-extension://762e4395-b145-4620-8dd9-31bf09e052de/options.html#nav=456d07d2-2ca3-4a29-bd4d-3d3b7726255f+editor"

(function() {
    'use strict'
    let current_index = -1
    let PARENT_COMMENTS_arr = []

    function FIND_PARENT_COMMENTS() {
        PARENT_COMMENTS_arr = []
        const comments = document.querySelectorAll('shreddit-comment[depth="0"')
        comments.forEach(comment => PARENT_COMMENTS_arr.push(comment))
    }

    function NEXT_PARENT_COMMENT() {
        FIND_PARENT_COMMENTS() // refresh new comments

        if (PARENT_COMMENTS_arr.length  > current_index + 1) {  // 5 (len) - 1 > 4 (index) ? 4 > 4 = false
            current_index++
            PARENT_COMMENTS_arr[current_index].scrollIntoView()
            HIGHLIGHT_COMMENT(PARENT_COMMENTS_arr[current_index])
            ADJUST_POSITION()
        }
    }

    function PREV_PARENT_COMMENT() {
        FIND_PARENT_COMMENTS() // refresh new comments

        if (current_index > 0) {
            current_index--
            PARENT_COMMENTS_arr[current_index].scrollIntoView()
            HIGHLIGHT_COMMENT(PARENT_COMMENTS_arr[current_index])
            ADJUST_POSITION()
        }
    }

    function ADJUST_POSITION() {
        window.scrollBy(0, -70); // Scroll up by 100 pixels
    }

    function HIGHLIGHT_COMMENT(active_comment) {

        PARENT_COMMENTS_arr.forEach(comment => comment.style.border = "none") // Remove highlight from all comments
        active_comment.style.border = '1px solid gray' // Highlight the current comment
    }

    const prev_btn = document.createElement('button')
    // prev_btn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>'
    prev_btn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="#808080" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>'
    // prev_btn.textContent = 'prev'
    prev_btn.style.position = 'fixed'
    prev_btn.style.right = '20px'
    prev_btn.style.top = '83%'
    prev_btn.addEventListener('click', PREV_PARENT_COMMENT)

    const next_btn = document.createElement('button')
    next_btn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="#808080" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>'
    // next_btn.textContent = 'next'
    next_btn.style.position = 'fixed'
    next_btn.style.right = '20px'
    next_btn.style.top = '90%'
    next_btn.addEventListener('click', NEXT_PARENT_COMMENT)

    document.body.appendChild(prev_btn)
    document.body.appendChild(next_btn)

    window.addEventListener('load', () => {current_index = -1})
    window.addEventListener('load', FIND_PARENT_COMMENTS)
    // window.addEventListener('scroll', FIND_PARENT_COMMENTS);
})()

