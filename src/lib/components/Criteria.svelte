<script>
	import dedent from 'ts-dedent';

	const criteria1BodyReq = dedent(`{
        "title": string,
        "year": number,
        "artist": string,
        "genre": string,
        "duration": number,
    }`);
	const criteria1MusicScheme = dedent(`{
        <strong>"id": 1,</strong>
        "title": "The Jude", 
        "year": 1968,
        "artist": "The Beatles",  
        "genre": "Pop rock",
        "duration": 430,
        <strong>"created_at": 2024-03-31T03:20:51Z,</strong>
        <strong>"updated_at": 2024-03-31T04:02:55Z</strong>
    }`);
</script>

<p>Terdapat beberapa kriteria utama yang harus Anda penuhi dalam membuat proyek Music API.</p>

<h2 id="criteria-1">Kriteria 1: API dapat menyimpan musik</h2>
<p>API yang anda buat harus dapat menyimpan musik melalui route:</p>
<ul>
	<li>Method: <strong>POST</strong></li>
	<li>URL: <strong>/api/musics</strong></li>
	<li>
		Body Request:
		<pre><code>{criteria1BodyReq}</code></pre>
	</li>
</ul>
<p>
	Objek musik yang disimpan pada <i>server</i> <strong>harus</strong> memiliki struktur seperti contoh
	di bawah ini:
</p>
<pre><code>{@html criteria1MusicScheme}</code></pre>
<details>
	<summary>
		Properti yang ditebalkan diolah dan di-<i>generate</i> di sisi server. Berikut penjelasannya:
		<strong>(Klik untuk melihat)</strong>
	</summary>
	<ul>
		<li>
			<code>id</code>: nilai <code>id</code> haruslah unik. Untuk membuat nilai unik, Anda bisa
			memanfaatkan fitur
			<a href="https://laravel.com/docs/11.x/migrations#column-method-increments"
				><code>increments()</code></a
			>
			pada file migration, atau bisa menggunakan
			<a href="https://laravel.com/docs/11.x/eloquent#uuid-and-ulid-keys">UUID</a>. Anda bisa
			pelajari tentang primary key pada Laravel
			<a href="https://laravel.com/docs/11.x/eloquent#primary-keys">disini</a>.
		</li>
		<li>
			<code>created_at</code>: merupakan properti yang menampung tanggal dimasukkannya musik. Anda
			bisa menggunakan
			<a href="https://laravel.com/docs/11.x/migrations#column-method-timestamps"
				><code>timestamps()</code></a
			> pada file migration Anda. Pada Laravel, properti ini otomatis terisi, jadi tidak perlu mengisi
			manual.
		</li>
		<li>
			<code>updated_at</code>: merupakan properti yang menampung tanggal kapan data musik diubah.
			Jika menggunakan <code>timestamp()</code> pada migration, maka otomatis properti ini akan dibuat.
			Nilai properti ini akan diubah otomatis oleh Laravel, ketika data diperbarui.
		</li>
	</ul>
</details>
