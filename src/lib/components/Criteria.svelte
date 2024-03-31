<script lang="ts">
	import { dedent } from 'ts-dedent';

	const criteria5BodyReq = dedent(`{
      "title": string,
      "year": number,
      "artist": string,
      "genre": string,
      "duration": number
  }`);
	const criteria5MusicScheme = dedent(`{
      <strong>"id": 1,</strong>
      "title": "Hey Jude", 
      "year": 1968,
      "artist": "The Beatles",  
      "genre": "Pop rock",
      "duration": 430,
      <strong>"created_at": 2024-03-31T03:20:51Z,</strong>
      <strong>"updated_at": 2024-03-31T04:02:55Z</strong>
  }`);
	const criteria5ResponseSuccess = dedent(`{
      "id": 2,
      "title": "Arkadia", 
      "year": 2019,
      "artist": "Babymetal",
      "genre": "Metal",
      "duration": 319,
      "created_at": 2024-03-31T03:20:51Z,
      "updated_at": 2024-03-31T04:02:55Z
  }`);

	const criteria6ResponseSuccess = dedent(`[
      {
          "id": 1,
          "title": "Hey Jude",
          "artist": "The Beatles",
      },
      {
          "id": 2,
          "title": "Arkadia",
          "artist": "Babymetal",
      }
  ]`);
	const criteria6ResponseSuccessEmpty = `[]`;
	const criteria7ResponseNotFound = dedent(`{
      "status": "failed",
      "message": "musik tidak ditemukan"
  }`);
	const criteria8BodyReq = dedent(`{
      "title": ?string,
      "year": ?number,
      "artist": ?string,
      "genre": ?string,
      "duration": ?number
  }`);
	const criteria8ResponseSuccess = dedent(`{
      "id": 2,
      "title": "Arkadia", 
      "year": 2019,
      "artist": "Babymetal",
      "genre": "J-Pop",
      "duration": 319,
      "created_at": 2024-03-31T03:20:51Z,
      "updated_at": 2024-04-31T11:13:29Z
  }`);
	const optCriteria1ValidationError = dedent(`{
      "message": "The title field is required. (and 1 more error)",
      "errors": {
          "title": [
              "The title field is required."
          ],
          "duration": [
              "The duration field is required."
          ]
      }
  }`);
</script>

<p>Terdapat beberapa kriteria utama yang harus Anda penuhi dalam membuat proyek Music API.</p>

<a href="#criteria-1"><h2 id="criteria-1">Kriteria 1: Menggunakan Laravel</h2></a>
<ul>
	<li>
		API harus dibuat menggunakan <a href="https://laravel.com/">Laravel</a>, dengan minimal versi 9
		(diperbolehkan menggunakan versi 9, 10, atau 11).
	</li>
	<li>
		Pastikan Anda menginstal versi Laravel yang sesuai sebelum memulai membuat aplikasi. Untuk
		informasi lebih lanjut bisa membuka dokumentasi <i>official</i>
		Laravel <a href="https://laravel.com/docs/11.x/installation">disini</a>.
	</li>
	<li>
		Perlu diperhatikan bahwa setiap versi Laravel mempunyai kebutuhan yang berbeda, sebagai contoh
		Laravel 9 minimal harus menggunakan PHP 7.4.
	</li>
</ul>

<a href="#criteria-2"><h2 id="criteria-2">Kriteria 2: Menggunakan MySQL sebagai database</h2></a>
<ul>
	<li>Data harus disimpan di dalam database menggunakan <strong>MySQL</strong>.</li>
	<li>
		<strong>Wajib</strong> mengkonfigurasi database seperti host, port, maupun kredensial dalam
		mengakses ke database pada file <code>.env</code>.
	</li>
	<li>
		Untuk informasi lebih lanjut mengenai tata cara menggunakan database MySQL di Laravel bisa
		membuka dokumentasi <a href="https://laravel.com/docs/11.x/database">berikut</a>.
	</li>
</ul>

<a href="#criteria-3"><h2 id="criteria-3">Kriteria 3: Menggunakan database migration</h2></a>
<ul>
	<li>
		<strong>Wajib</strong> menggunakan teknik migrations dalam mengelola struktur tabel pada database.
	</li>
	<li>
		Jalankan perintah <code>php artisan make:migration &lt;nama_migration&gt;</code> untuk membuat migration.
	</li>
	<li>
		Baca dokumentasi mengenai database migration
		<a href="https://laravel.com/docs/11.x/migrations">disini</a>.
	</li>
</ul>

<a href="#criteria-4"><h2 id="criteria-4">Kriteria 4: Menggunakan API Routes</h2></a>
<ul>
	<li>
		<strong>Wajib</strong> menggunakan API route pada laravel (route dibuat pada file
		<code>routes/api.php</code>).
	</li>
	<li>
		Karena routes didefinisikan pada file <code>routes/api.php</code>, maka otomatis route akan
		diberi prefix <code>/api</code>.
	</li>
	<li>
		Untuk melihat routes pada aplikasi laravel Anda, bisa menjalankan perintah
		<code>php artisan route:list</code>.
	</li>
</ul>
<small>
	*Jika Anda menggunakan Laravel 11, maka perlu menjalankan perintah
	<code>php artisan install:api</code> sebelum mendefinisikan routes. Baca lebih lengkap
	<a href="https://laravel.com/docs/11.x/structure#the-routes-directory">disini</a>.
</small>

<a href="#criteria-5"><h2 id="criteria-5">Kriteria 5: API dapat menyimpan musik</h2></a>
<p>API yang anda buat harus dapat menyimpan musik melalui route:</p>
<ul>
	<li>Method: <strong>POST</strong></li>
	<li>URL: <strong>/api/musics</strong></li>
	<li>
		Body Request:
		<pre><code>{criteria5BodyReq}</code></pre>
	</li>
</ul>
<p>
	Objek musik yang disimpan pada <i>server</i> <strong>harus</strong> memiliki struktur seperti contoh
	di bawah ini:
</p>
<pre><code>{@html criteria5MusicScheme}</code></pre>
<details>
	<summary>
		Properti yang ditebalkan diolah dan di-<i>generate</i> di sisi server. Berikut penjelasannya:
		<strong>(Klik untuk melihat)</strong>
	</summary>
	<ul>
		<li>
			<code>id</code>: nilai <code>id</code> haruslah unik. Untuk membuat nilai unik, Anda bisa
			memanfaatkan fitur
			<a href="https://laravel.com/docs/11.x/migrations#column-method-increments">
				<code>increments()</code>
			</a>
			pada file migration, atau bisa menggunakan
			<a href="https://laravel.com/docs/11.x/eloquent#uuid-and-ulid-keys">UUID</a>. Anda bisa
			pelajari tentang primary key pada Laravel
			<a href="https://laravel.com/docs/11.x/eloquent#primary-keys">disini</a>.
		</li>
		<li>
			<code>created_at</code>: merupakan properti yang menampung tanggal dimasukkannya musik. Anda
			bisa menggunakan
			<a href="https://laravel.com/docs/11.x/migrations#column-method-timestamps">
				<code>timestamps()</code>
			</a> pada file migration Anda. Pada Laravel, properti ini otomatis terisi, jadi tidak perlu mengisi
			manual.
		</li>
		<li>
			<code>updated_at</code>: merupakan properti yang menampung tanggal kapan data musik diubah.
			Jika menggunakan <code>timestamp()</code> pada migration, maka otomatis properti ini akan dibuat.
			Nilai properti ini akan diubah otomatis oleh Laravel, ketika data diperbarui.
		</li>
	</ul>
</details>
<p>
	Bila musik berhasil dimasukkan, server harus mengembalikan respons data musik yang baru
	ditambahkan:
</p>
<ul>
	<li>Status code: <strong>201</strong></li>
	<li>
		Response body:
		<pre><code>{criteria5ResponseSuccess}</code></pre>
	</li>
</ul>

<a href="#criteria-6"><h2 id="criteria-6">Kriteria 6: API dapat menampilkan seluruh musik</h2></a>
<p>API yang Anda buat harus dapat menampilkan seluruh musik yang disimpan melalui route:</p>
<ul>
	<li>Method: <strong>GET</strong></li>
	<li>URL: <strong>/api/musics</strong></li>
</ul>
<p>Server harus mengembalikan response dengan:</p>
<ul>
	<li>Status code: <strong>200</strong></li>
	<li>
		Response body:
		<pre><code>{criteria6ResponseSuccess}</code></pre>
	</li>
</ul>
<p>Jika belum terdapat musik yang dimasukkan, server bisa merespons dengan array kosong.</p>
<pre><code>{criteria6ResponseSuccessEmpty}</code></pre>

<a href="#criteria-7"><h2 id="criteria-7">Kriteria 7: API dapat menampilkan detail musik</h2></a>
<p>API yang Anda buat harus dapat menampilkan detail musik yang disimpan melalui route:</p>
<ul>
	<li>Method: <strong>GET</strong></li>
	<li>URL: <strong>/api/musics/&lbrace;id&rbrace;</strong></li>
</ul>
<p>
	Bila musik dengan <code>id</code> yang dilampirkan <strong>ditemukan</strong>, maka server harus
	mengembalikan respons dengan:
</p>
<ul>
	<li>Status code: <strong>200</strong></li>
	<li>
		Response body:
		<pre><code>{criteria5ResponseSuccess}</code></pre>
	</li>
</ul>
<p>
	Bila musik dengan <code>id</code> yang dilampirkan oleh client <strong>tidak ditemukan</strong>,
	maka server harus mengembalikan respons dengan:
</p>
<ul>
	<li>Status code: <strong>404</strong></li>
	<li>
		Response body:
		<pre><code>{criteria7ResponseNotFound}</code></pre>
	</li>
</ul>

<a href="#criteria-8"><h2 id="criteria-8">Kriteria 8: API dapat mengubah data musik</h2></a>
<p>API yang Anda buat harus dapat menampilkan detail musik yang disimpan melalui route:</p>
<ul>
	<li>Method: <strong>PUT</strong></li>
	<li>URL: <strong>/api/musics/&lbrace;id&rbrace;</strong></li>
	<li>
		Request body:
		<pre><code>{criteria8BodyReq}</code></pre>
		<small>*Semua field pada request body opsional.</small>
	</li>
</ul>
<p>
	Bila musik <strong>berhasil diperbarui</strong>, server harus mengembalikan respons dengan data
	musik terbaru:
</p>
<ul>
	<li>Status code: <strong>200</strong></li>
	<li>
		Response body:
		<pre><code>{criteria8ResponseSuccess}</code></pre>
	</li>
</ul>
<p>
	Bila musik dengan <code>id</code> yang dilampirkan oleh client <strong>tidak ditemukan</strong>,
	maka server harus mengembalikan respons dengan:
</p>
<ul>
	<li>Status code: <strong>404</strong></li>
	<li>
		Response body:
		<pre><code>{criteria7ResponseNotFound}</code></pre>
	</li>
</ul>

<a href="#criteria-9"><h2 id="criteria-9">Kriteria 9: API dapat menghapus musik</h2></a>
<p>API yang Anda buat harus dapat menghapus detail musik yang disimpan melalui route:</p>
<ul>
	<li>Method: <strong>DELETE</strong></li>
	<li>URL: <strong>/api/musics/&lbrace;id&rbrace;</strong></li>
</ul>
<p>
	Bila musik <strong>berhasil dihapus</strong>, server harus mengembalikan respons berikut:
</p>
<ul>
	<li>Status code: <strong>204</strong></li>
	<li>Response body: empty (kosong)</li>
</ul>
<p>
	Bila musik dengan <code>id</code> yang dilampirkan oleh client <strong>tidak ditemukan</strong>,
	maka server harus mengembalikan respons dengan:
</p>
<ul>
	<li>Status code: <strong>404</strong></li>
	<li>
		Response body:
		<pre><code>{criteria7ResponseNotFound}</code></pre>
	</li>
</ul>

<a href="#optional-criteria"><h2 id="optional-criteria">Kriteria Opsional</h2></a>
<p>
	Selain kriteria utama, terdapat kriteria opsional yang yang dapat Anda penuhi agar mendapat nilai
	yang baik.
</p>

<a href="#optional-criteria-1">
	<h2 id="optional-criteria-1">Kriteria Opsional 1: Menerapkan data validation</h2>
</a>
<p>Menerapkan proses Data Validation pada Request Payload sesuai spesifikasi berikut:</p>
<ul>
	<li>
		POST /api/musics
		<ul>
			<li><strong>title</strong>: required, string</li>
			<li><strong>year</strong>: required, number</li>
			<li><strong>artist</strong>: required, string</li>
			<li><strong>genre</strong>: required, string</li>
			<li><strong>duration</strong>: required, number</li>
		</ul>
	</li>
	<li>
		PUT /api/musics/&lbrace;id&rbrace;
		<ul>
			<li><strong>title</strong>: string</li>
			<li><strong>year</strong>: number</li>
			<li><strong>artist</strong>: string</li>
			<li><strong>genre</strong>: string</li>
			<li><strong>duration</strong>: number</li>
		</ul>
	</li>
</ul>
<p>
	Jika terdapat request body yang tidak valid, maka server harus mengembalikan response sebagai
	berikut:
</p>
<pre><code>{optCriteria1ValidationError}</code></pre>
<p>
	Jika menggunakan fitur Validation bawaan pada Laravel, maka server otomatis merespons seperti di
	atas jika terdapat input yang tidak valid. Untuk informasi lebih lanjut mengenai Validation pada
	Laravel bisa membuka link
	<a href="https://laravel.com/docs/11.x/validation">berikut</a>.
</p>

<a href="#notes"><h2 id="notes">Catatan</h2></a>
<ul>
	<li>Semua response dan request body yang disebutkan di atas dikirim dalam format JSON.</li>
</ul>
