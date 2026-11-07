# uOttawa Software Engineering Students' Association (SESA)

This is the repository for the main SESA website.

## Prerequisites

- Node.js 22+
- pnpm

### Nix

If you use Nix, the flake provides a dev shell with Node.js and pnpm:

```sh
nix develop
```

Or, with [direnv](https://direnv.net/), run `direnv allow` once and the shell loads automatically.

### Other platforms

It's recommended to install Node with a version manager such as [fnm](https://github.com/Schniz/fnm)
rather than the one-off installer, then adding pnpm. See fnm's
[installation docs](https://github.com/Schniz/fnm#installation) for more options.

> [!NOTE]
> Node 25 and newer no longer bundle Corepack, so skip any `corepack enable` steps you see in older guides.

#### Windows

1. Install fnm:

   ```powershell
   winget install Schniz.fnm
   ```

   Add this line to your PowerShell profile (`notepad $PROFILE`), then restart the terminal:

   ```powershell
   fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression
   ```

2. Install Node:

   ```powershell
   fnm install --lts
   ```

3. Install pnpm (npm is recommended on Windows, since Microsoft Defender may block pnpm's standalone executable):

   ```powershell
   npm install -g pnpm@latest
   ```

   If installs are slow, exclude the pnpm store from Defender by running
   `Add-MpPreference -ExclusionPath $(pnpm store path)` in an admin PowerShell window.

#### macOS

1. Install fnm with Homebrew, then restart the terminal:

   ```sh
   brew install fnm
   echo 'eval "$(fnm env --use-on-cd --shell zsh)"' >> ~/.zshrc
   ```

2. Install Node:

   ```sh
   fnm install --lts
   ```

3. Install pnpm with the standalone script (independent of the active Node version):

   ```sh
   curl -fsSL https://get.pnpm.io/install.sh | sh -
   ```

   `npm install -g pnpm@latest` also works.

#### Linux

Install fnm from your distro's package manager if it's packaged,
or with the [install script](https://github.com/Schniz/fnm#using-a-script-macoslinux),
and add `eval "$(fnm env --use-on-cd)"` to your shell's rc file. Then install Node and pnpm as on macOS:

```sh
fnm install --lts
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

Alternatively, install `nodejs` and `pnpm` directly from your package manager, as long as it provides Node 22 or newer.

#### Updating pnpm

Run `pnpm self-update` (available from pnpm v11.10.0 onwards).

## Getting Started

Install the dependencies:

```sh
pnpm install
```

Then build packages:

```sh
pnpm build
```

Then start development server:

```sh
pnpm dev --filter web
```

> [!NOTE]
> You will need to store your environment variables under `apps/web/.env`

Open [http://localhost:3000](http://localhost:3000) to see the website.

## License

This project is licensed under the GNU Affero General Public License, Version 3.0
([LICENSE](LICENSE) or <https://www.gnu.org/licenses/agpl-3.0.en.html>).
