import { ChildProcess } from "child_process";

/**
 * Write the stdin into the child process
 * @param proc Child process refrence
 * @param stdin stdin string
 */
export function writeToStdin(proc: ChildProcess, stdin: string): void {
    if (stdin) {
        if (proc.stdin) {
            proc.stdin.write(stdin + '\r\n', err => {
                if (!err) {
                    if (proc.stdin) {
                        proc.stdin.end();
                    } else {
                        console.error("error while ending stdin.", {
                            err,
                            ["proc.stdin"]: proc.stdin,
                        });
                    }
                }
            });
            proc.stdin.on("error", err => {
                // Ignore input if stream is already closed
                return;
            });
        } else {
            console.error("error while writing to stdin.", {
                stdin,
                ["proc.stdin"]: proc.stdin,
            });
        }
    }
}