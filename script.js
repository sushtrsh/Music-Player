document.getElementById('play-button').addEventListener('click', () => {
  const url = document.getElementById('youtube-url').value;
  const audioPlayer = document.getElementById('audio-player');
  
  if (!url) {
    alert('Masukkan URL YouTube!');
    return;
  }

  // Ekstrak video ID dari URL
  const videoID = new URLSearchParams(new URL(url).search).get('v');
  if (!videoID) {
    alert('URL tidak valid!');
    return;
  }

  // URL API untuk mengonversi YouTube ke MP3
  const apiUrl = `https://cors-anywhere.herokuapp.com/https://yt-download.org/api/button/mp3/${videoID}`;
  // Mengambil audio dari API
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      // Anda perlu mengurai dan menemukan link MP3 dari respons
      const mp3Url = extractMp3UrlFromApiResponse(data);
      audioPlayer.src = mp3Url; // Set audio source
      audioPlayer.load();
      audioPlayer.play();
    })
    .catch(err => alert('Terjadi kesalahan: ' + err.message));
});

// Fungsi untuk mengekstrak URL MP3 dari respons API
function extractMp3UrlFromApiResponse(data) {
  // Misalnya, jika respons adalah HTML, kita bisa menggunakan parser
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');
  const linkElement = doc.querySelector('a'); // Sesuaikan dengan elemen yang tepat
  return linkElement ? linkElement.href : ''; // Mengembalikan link MP3
        }
