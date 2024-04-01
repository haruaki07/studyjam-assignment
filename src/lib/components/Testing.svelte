<script lang="ts">
	import postmanImportImg from '$lib/assets/postman-import.png';
	import postmanImportDropImg from '$lib/assets/postman-import-drop.jpeg';
	import collectionSsImg from '$lib/assets/collection-ss.png';
	import environmentSsImg from '$lib/assets/environment-ss.png';
	import testPassedImg from '$lib/assets/test-passed.png';
</script>

<p>
	Ketika membangun MusicShelf API, tentu Anda perlu menguji untuk memastikan API berjalan sesuai
	dengan kriteria yang ada. Kami sudah menyediakan berkas Postman Collection dan Environment yang
	dapat Anda gunakan untuk pengujian. Silakan unduh kedua berkas (Environment dan Collection) pada
	tautan berikut:
</p>

<ul>
	<li>
		<a href="/StudyJam Final Project Web Advanced Environment.postman_environment.json" download>
			Postman MusicShelf API Environment
		</a>
	</li>
	<li>
		<a href="/StudyJam Final Project Web Advanced.postman_collection.json" download>
			Postman MusicShelf API Collection
		</a>
	</li>
</ul>

<p>
	Anda perlu meng-import kedua berkas tersebut pada Postman untuk menggunakannya. Buka Postman Anda,
	kemudian klik tombol import yang berada di atas panel kiri aplikasi Postman.
</p>

<img src={postmanImportImg} alt="Postman Import Step" />

<p>
	Kemudian klik tombol <strong>Upload Files</strong>, dan import kedua berkas JSON yang telah
	didownload.
</p>
<img src={postmanImportDropImg} alt="Postman Import Drop Step" />

<p>Setelah itu, MusicShelf API Collection dan Environment akan tersedia pada Postman Anda.</p>

<ol>
	<li>
		Collection
		<img src={collectionSsImg} alt="MusicShelf API Collection" />
	</li>
	<li>
		Environment
		<img src={environmentSsImg} alt="MusicShelf API Environment" />
	</li>
</ol>

<p>
	Silahkan gunakan Collection tersebut untuk menguji apakah API yang telah Anda buat sudah sesuai
	kriteria atau belum.
</p>
<p>
	Pada Collection tersebut juga disediakan test untuk setiap request-nya sesuai dengan kriteria yang
	ada. Pastikan bahwa test yang berjalan berhasil (Passed) seperti berikut:
</p>
<img src={testPassedImg} alt="Test Passed" />
