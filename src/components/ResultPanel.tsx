import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import type { Result } from "../types";

export function ResultPanel({ result }: { result: Result }) {
  return <>
    <Paper variant="outlined" sx={{ bgcolor: "background.default", p: 2.25 }}>
      {result.score && <Chip color="primary" label={result.score} sx={{ mb: 1.5, fontWeight: 800 }} />}
      <Typography variant="h6" component="h3">{result.title}</Typography>
      <Typography color="text.secondary" sx={{ mt: 0.5 }}>{result.message}</Typography>
      {result.summary.length > 0 && <Stack component="ul" spacing={0.75} sx={{ mb: 0, pl: 2.5 }}>
        {result.summary.map((item) => <Typography component="li" variant="body2" key={item}>{item}</Typography>)}
      </Stack>}
    </Paper>
    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1.5, mt: 3.25 }}>
      <Button variant="outlined" type="button" data-action="back">Back</Button>
      <Button variant="contained" type="button" data-action="copy">Copy summary for EMR</Button>
    </Box>
  </>;
}
