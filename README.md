<p align="center">
  <img src="https://raw.githubusercontent.com/remarkablegames/linkit/master/public/screenshots/title.png" alt="Linkit" width="360">
</p>

# Linkit

[![release](https://img.shields.io/github/v/release/remarkablegames/linkit)](https://github.com/remarkablegames/linkit/releases)
[![build](https://github.com/remarkablegames/linkit/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablegames/linkit/actions/workflows/build.yml)

🔴 Linkit is a puzzle where you connect the dots. Read the [blog post](https://remarkablegames.org/posts/linkit/).

This game was made for [Gamedev.js Jam 2024](https://itch.io/jam/gamedevjs-2024), which the theme was `power`.

Play the game on:

- [itch.io](https://remarkablegames.itch.io/linkit)
- [newgrounds](https://www.newgrounds.com/portal/view/930960)
- [remarkablegames](https://remarkablegames.org/linkit/)

## Credits

- [remarkablemark](https://github.com/remarkablemark) - Developer
- [Rob Cohen](https://github.com/rmacohen) - Level Design
- [Kenney Interface Sounds](https://kenney.nl/assets/interface-sounds)

## Ideation

- [Excalidraw](https://excalidraw.com/#json=kdRfqSm9UoL0cEQ8MPRNo,mMrxHx-OPwRogYySd-1PqQ)
- [Replit](https://replit.com/@remarkablemark/Linkit)

## Prerequisites

- [nvm](https://github.com/nvm-sh/nvm#readme)

## Install

Clone the repository:

```sh
git clone https://github.com/remarkablegames/linkit.git
cd linkit
```

Install the dependencies:

```sh
npm install
```

## Environment Variables

Set the environment variables:

```sh
less .env
```

Update the **Secrets** in the repository **Settings**.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the game in the development mode.

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.

You will also see any errors in the console.

### `npm run build`

Builds the game for production to the `dist` folder.

It correctly bundles in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your game is ready to be deployed!

### `npm run bundle`

Builds the game and packages it into a Zip file in the `dist` folder.

Your game can be uploaded to your server, [Itch.io](https://itch.io/), [Newgrounds](https://www.newgrounds.com/), etc.

### `npm run generate-level`

Randomly generates a level.

> [!NOTE]
> Make sure to playtest the level by appending `?level=<number>` to the URL.

#### Examples

2x2 grid that is filled 100% with 1 color:

```sh
npm run generate-level -- --columns=2 --rows=2 --colors=1 --fill=1
```

Output:

```js
[
  [M, M],
  [M, M],
];
```

4x4 grid that is filled 50% with 2 colors:

```sh
npm run generate-level -- --columns=4 --rows=4 --colors=2 --fill=.5
```

Output:

```js
[
  [_, _, M, M],
  [_, Y, M, Y],
  [M, _, _, _],
  [Y, _, M, _],
];
```

## License

[MIT](LICENSE)
