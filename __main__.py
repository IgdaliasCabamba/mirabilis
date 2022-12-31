import sys
sys.dont_write_bytecode = True

import click
import rich
import pathlib
from utils.assets import compile_static_assets


@click.group()
def manage():
    pass


@manage.command('dist')
def dist():
    rich.print("[yellow]Compiling...")
    try:
        compile_static_assets(
            pathlib.Path(__file__)
            .parent
            .joinpath("src")
            .as_posix()
        )
        rich.print("[green]Compilled 100%; 0 errors")

    except Exception as e:
        rich.print(e)

if __name__ == '__main__':
    manage()