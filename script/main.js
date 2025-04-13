//Utilities

// Arrow function untuk ambil elemen DOM
const $ = (selector) => document.querySelector(selector);

// Loader
const showLoader = (text = "⏳ Loading...") => {
  const loader = $('#loader');
  loader.textContent = text;
  loader.classList.remove('hidden');
};

const hideLoader = () => {
  $('#loader').classList.add('hidden');
};

//Async Delay

const fakeAsyncSave = async (dataName) => {
  showLoader(`⏳ ${dataName}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`✅ ${dataName} selesai!`);
      hideLoader();
      resolve();
    }, 500);
  });
};

//Jam real time

const updateTime = () => {
  const now = new Date();
  const timeString = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  $('#current-time').textContent = timeString;
};

setInterval(updateTime, 1000);
updateTime();

//Class Todo

class TodoList {
  constructor(storageKey) {
    this.storageKey = storageKey;
    this.todos = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    this.render();
  }

  async addTodo(task) {
    this.todos.push(task);
    await this.save('Menambahkan Tugas');
    this.render();
  }

  async removeTodo(index) {
    this.todos.splice(index, 1);
    await this.save('Menghapus Tugas');
    this.render();
  }

  async editTodo(index, newText) {
    if (newText) {
      this.todos[index] = newText;
      await this.save('Menyunting Tugas');
      this.render();
    }
  }

  async save(actionName = 'Daftar Tugas') {
    await fakeAsyncSave(actionName);
    localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
  }

  render() {
    const list = $('#todo-list');
    list.innerHTML = '';

    this.todos.forEach((task, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span contenteditable="true">${task}</span>
        <button><i class='bx bx-trash'></i></button>
      `;

      // Event: Edit
      const span = li.querySelector('span');
      span.addEventListener('blur', (e) => {
        const newText = e.target.textContent.trim();
        this.editTodo(index, newText);
      });

      // Event: Hapus
      const btn = li.querySelector('button');
      btn.addEventListener('click', () => {
        this.removeTodo(index);
      });

      list.appendChild(li);
    });
  }
}

const todoList = new TodoList('studybuddy_todos');

//Event Tugas

$('#todo-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = $('#todo-input');
  const value = input.value.trim();
  if (value) {
    todoList.addTodo(value);
    input.value = '';
  }
});

//Catatan Kuliah

const saveNotes = async () => {
    const inputLines = $('#notes-area').value
      .split('\n')
      .filter(line => line.trim() !== '');
  
    const data = inputLines.map(line => ({ text: line, done: false }));
  
    await fakeAsyncSave('Menyimpan Catatan');
    localStorage.setItem('studybuddy_notes', JSON.stringify(data));
    loadNotes();
  };  
  
  const loadNotes = () => {
    const notesArea = $('#notes-area');
    const display = $('#display-notes');
    const raw = localStorage.getItem('studybuddy_notes');
    const data = raw ? JSON.parse(raw) : [];
  
    // Refill textarea
    if (notesArea) {
      notesArea.value = data.map(item => item.text).join('\n');
    }
  
    // Render checklist
    display.innerHTML = '';
    if (data.length === 0) {
      display.innerHTML = '<li><em>Belum ada catatan tersimpan.</em></li>';
      return;
    }
  
    data.forEach((item, index) => {
      const li = document.createElement('li');
  
      // Checklist box
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = item.done;
      checkbox.addEventListener('change', () => toggleDone(index));
  
      // Text
      const span = document.createElement('span');
      span.textContent = item.text;
      if (item.done) span.style.textDecoration = 'line-through';
  
      // Delete button
      const btn = document.createElement('button');
      btn.innerHTML = '<i class="bx bx-trash"></i>';
      btn.classList.add('display-notes-delete');
      btn.addEventListener('click', () => removeNoteLine(index));
  
      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(btn);
      display.appendChild(li);
    });
  };  
  const toggleDone = (index) => {
    const data = JSON.parse(localStorage.getItem('studybuddy_notes')) || [];
    data[index].done = !data[index].done;
    localStorage.setItem('studybuddy_notes', JSON.stringify(data));
    loadNotes();
  };
  
  const removeNoteLine = async (index) => {
    const data = JSON.parse(localStorage.getItem('studybuddy_notes')) || [];
    data.splice(index, 1);
    await fakeAsyncSave('Menghapus Catatan');
    localStorage.setItem('studybuddy_notes', JSON.stringify(data));
    loadNotes();
  };
        
  
  document.addEventListener('DOMContentLoaded', () => {
    $('#save-notes').addEventListener('click', saveNotes);
    loadNotes();
  });
  
  document.getElementById('toggle-notes-display').addEventListener('click', () => {
    const header = document.getElementById('toggle-notes-display');
    const container = document.getElementById('notes-display-container');
    container.classList.toggle('expanded');
    header.classList.toggle('expanded');
  });
      

//DARK MODE TOGGLE

const toggleTheme = () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('studybuddy_theme', document.body.classList.contains('dark') ? 'dark' : 'light');
};

$('#toggle-theme').addEventListener('click', toggleTheme);

if (localStorage.getItem('studybuddy_theme') === 'dark') {
  document.body.classList.add('dark');
}

let pomodoroDuration = 25 * 60;
let pomodoroTime = pomodoroDuration;
let pomodoroInterval = null;

const updatePomodoroDisplay = () => {
  const minutes = String(Math.floor(pomodoroTime / 60)).padStart(2, '0');
  const seconds = String(pomodoroTime % 60).padStart(2, '0');
  $('#pomodoro-timer').textContent = `${minutes}:${seconds}`;
};

const startPomodoro = () => {
    const inputMinutes = parseInt($('#pomodoro-input').value);
    if (isNaN(inputMinutes) || inputMinutes < 1) {
      alert('Masukkan durasi yang valid (minimal 1 menit)');
      return;
    }
    const sound = $('#pomodoro-sound');
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
      sound.play().then(() => {
        sound.pause();
        sound.currentTime = 0;
      }).catch(() => {}); // ini buat 'unlock' audio context
    }
  
    pomodoroDuration = inputMinutes * 60;
    pomodoroTime = pomodoroDuration;
  
    if (pomodoroInterval) return;
  
    pomodoroInterval = setInterval(() => {
      if (pomodoroTime > 0) {
        pomodoroTime--;
        updatePomodoroDisplay();
      } else {
        clearInterval(pomodoroInterval);
        pomodoroInterval = null;

        if (sound) {
            sound.currentTime = 0;
            sound.play().then(() => {
              console.log("✅ Suara berhasil dimainkan");
            }).catch(e => {
              console.warn("❌ Gagal memainkan suara:", e);
            });
          }
        setTimeout(() => {
          alert("Pomodoro selesai! Saatnya istirahat 🎉");
          if (sound) {
            sound.pause();
            sound.currentTime = 0;
          }
        }, 100);
      }
    }, 1000);
  
    updatePomodoroDisplay();
  };  

const resetPomodoro = () => {
  clearInterval(pomodoroInterval);
  pomodoroInterval = null;

  const inputMinutes = parseInt($('#pomodoro-input').value);
  pomodoroDuration = inputMinutes * 60;
  pomodoroTime = pomodoroDuration;

  updatePomodoroDisplay();
};

$('#start-pomodoro').addEventListener('click', startPomodoro);
$('#reset-pomodoro').addEventListener('click', resetPomodoro);
updatePomodoroDisplay();