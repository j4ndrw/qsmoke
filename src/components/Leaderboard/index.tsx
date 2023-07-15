import { Button, Table, TableCell, TableHead, TableRow } from "@suid/material";
import { store } from "../../store";
import { format } from "date-fns";
import { formatElapsedTime } from "../../utils";
import { Component, For } from "solid-js";

type Props = { formattedElapsedTime: string | null };

const Leaderboard: Component<Props> = (props) => {
  const handleDeleteLeaderboard = () => store().deleteLeaderboard();
  return (
    <div class="max-h-[48rem] overflow-y-scroll">
      <div class="flex flex-col justify-center items-center">
        <Table class="[td]:text-white">
          <TableHead class="[&>td]:text-white">
            <TableCell>Stopped smoking at</TableCell>
            <TableCell>Started smoking at</TableCell>
            <TableCell>Time of abstinence</TableCell>
          </TableHead>
          <For each={store().leaderboard}>
            {(item) => (
              <TableRow class="[&>*]:text-white">
                <TableCell>
                  {format(item.stoppedSmokingAt, "dd-MM-yyyy")}
                </TableCell>
                <TableCell>
                  {item.startedSmokingAt
                    ? format(item.startedSmokingAt, "dd-MM-yyyy")
                    : "Ongoing"}
                </TableCell>
                <TableCell>
                  {props.formattedElapsedTime ??
                    formatElapsedTime(
                      (item.startedSmokingAt ?? new Date().getTime()) -
                        item.stoppedSmokingAt
                    )}
                </TableCell>
              </TableRow>
            )}
          </For>
        </Table>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDeleteLeaderboard}
        >
          Delete Leaderboard
        </Button>
      </div>
    </div>
  );
};

export default Leaderboard;
