# uOttawa Software Engineering Students' Association (SESA)

This is the repository for the main SESA website.

## Prerequisites

- Node.js 20+
- pnpm (activated via Corepack)
> [!NOTE]
> Node 25 and newer no longer include Corepack by default.
> If you are using Node >= 25, install Corepack manually with
>
> ```
> npm install -g corepack
> ```


## Getting Started

First, make sure that Corepack (included with Node.js) is enabled (if you're on Windows, run this command in a terminal as admin):

```sh
corepack enable
corepack prepare pnpm@latest --activate
```

Then, install the dependencies and start the development server:

```sh
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

## License

This project is licensed under the GNU Affero General Public License, Version 3.0
([LICENSE](LICENSE) or <https://www.gnu.org/licenses/agpl-3.0.en.html>).
