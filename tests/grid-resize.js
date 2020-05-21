const Split = require("split-grid");


Split({
    columnGutters: [
        {
            track: 1,
            element: document.querySelector('.vertical-gutter'),
        }
    ],
    rowGutters: [
        {
            track: 1,
            element: document.querySelector('.horizontal-gutter'),
        }
    ]
})
