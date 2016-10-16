# Parallel Asynchronous Recursive `ls`

A parallelized recursive implementation of `ls` using `fs.readdir`

## How To Use:

### Setup

1. Follow the [Node.js Setup Guide](http://guides.codepath.com/nodejs/Setup)
1. Clone the repo:

    ```bash
    git clone git@github.com:CrabDude/nodejs-ls.git
    ```

### Development

1. Place all your code in `ls.js`'s `async function ls()`:

    ```node
    require('./helper')

    async function ls() {
      // Use 'await' inside 'async function's
      console.log('Executing ls function...')
      
      // Your implementation here
    }

    ls()
    ```
1. Run:

    ```bash
    babel-node ./ls.js
    ```
