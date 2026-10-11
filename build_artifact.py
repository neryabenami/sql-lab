"""בונה גרסה של האתר כקובץ אחד לפרסום כ-Artifact: dist/sql-lab.html + dist/vendor/sql-wasm.wasm"""
import pathlib, re, shutil

root = pathlib.Path(__file__).parent
dist = root / 'dist'
(dist / 'vendor').mkdir(parents=True, exist_ok=True)
shutil.copy(root / 'vendor' / 'sql-wasm.wasm', dist / 'vendor' / 'sql-wasm.wasm')

html = (root / 'index.html').read_text(encoding='utf-8')
body = re.search(r'<body>(.*)</body>', html, re.S).group(1)
# מסירים את הסקריפטים המקומיים ומשאירים רק את ספריות ה-CDN
body = re.sub(r'\s*<script src="(data|data_extra|data_daily|questions|questions_extra|questions_daily|app)\.js(\?v=[^"]*)?"></script>', '', body)

css = (root / 'vendor' / 'codemirror.min.css').read_text(encoding='utf-8') + '\n' + (root / 'styles.css').read_text(encoding='utf-8')
js = '\n'.join((root / f).read_text(encoding='utf-8') for f in ['data.js', 'data_extra.js', 'questions.js', 'questions_extra.js', 'data_daily.js', 'questions_daily.js', 'app.js'])

out = f'''<meta charset="utf-8">
<title>SQL Lab</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>
{css}
</style>
<div dir="rtl" lang="he">
{body}
</div>
<script>window.SQLJS_LOCAL = true; document.documentElement.dir = 'rtl'; document.documentElement.lang = 'he';</script>
<script>
{js}
</script>
'''
(dist / 'sql-lab.html').write_text(out, encoding='utf-8')
print('built', dist / 'sql-lab.html')
