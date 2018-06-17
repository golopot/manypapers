const html = ({
  meta, styles, initialData, body,
}) => `
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="utf-8">
  <title>Manypapers</title>
  <script defer src="/js/main.js" ></script>
  <link rel="shortcut icon" type="image/png" href="data:image/png;base64,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"/>
  <link rel="manifest" href="/manifest.json">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="/css/main.css">
  <!-- <script defer src="https://use.fontawesome.com/e0a4d92771.js"></script> -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${meta}
  ${styles}
  <script>window.__INITIAL_DATA__ = ${initialData}</script>
</head>
<body>
  <div class="react-root">${body}</div>
</body>
</html>
`
module.exports = html
