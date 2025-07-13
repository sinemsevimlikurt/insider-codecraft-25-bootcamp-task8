// DOM Elemanlarını Seçme
document.addEventListener('DOMContentLoaded', function() {
    // Form ve liste elemanları
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const errorMessage = document.getElementById('error-message');
    const emptyListMessage = document.getElementById('empty-list-message');
    
    // Filtre ve sıralama elemanları
    const showCompletedBtn = document.getElementById('show-completed');
    const showAllBtn = document.getElementById('show-all');
    const sortPrioritySelect = document.getElementById('sort-priority');
    
    // Form elemanları
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const priorityInputs = document.querySelectorAll('input[name="priority"]');
    
    // Görev dizisi - tüm görevleri burada saklayacağız
    let tasks = [];
    let filterMode = 'all'; // 'all' veya 'completed'

    // Form gönderildiğinde yeni görev ekleme
    taskForm.addEventListener('submit', function(event) {
        // Sayfanın yenilenmesini engelle
        event.preventDefault();
        
        try {
            // Form doğrulama
            const title = titleInput.value.trim();
            const description = descriptionInput.value.trim();
            let priority = null;
            
            // Seçilen önceliği bul
            for (const input of priorityInputs) {
                if (input.checked) {
                    priority = input.value;
                    break;
                }
            }
            
            // Başlık kontrolü
            if (!title) {
                showError('Görev başlığı boş olamaz!');
                return;
            }
            
            // Öncelik kontrolü
            if (!priority) {
                showError('Lütfen bir öncelik seviyesi seçin!');
                return;
            }
            
            // Hata mesajını temizle
            clearError();
            
            // Yeni görev objesi oluştur
            const newTask = {
                id: Date.now().toString(), // Benzersiz ID
                title: title,
                description: description,
                priority: priority,
                completed: false,
                createdAt: new Date()
            };
            
            // Görev dizisine ekle
            tasks.push(newTask);
            
            // Görevi DOM'a ekle
            renderTasks();
            
            // Formu temizle
            taskForm.reset();
            
        } catch (error) {
            console.error('Görev eklerken hata oluştu:', error);
            showError('Beklenmeyen bir hata oluştu: ' + error.message);
        }
    });

    // Hata mesajı gösterme
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
    
    // Hata mesajını temizleme
    function clearError() {
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
    }
    
    // Görevleri DOM'a render etme
    function renderTasks() {
        // Önce liste içeriğini temizle
        taskList.innerHTML = '';
        
        // Görevleri filtrele
        let filteredTasks = tasks;
        if (filterMode === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }
        
        // Görevleri sırala
        const sortValue = sortPrioritySelect.value;
        if (sortValue !== 'none') {
            filteredTasks = [...filteredTasks].sort((a, b) => {
                const priorityMap = {
                    'düşük': 1,
                    'orta': 2,
                    'yüksek': 3
                };
                
                const priorityA = priorityMap[a.priority];
                const priorityB = priorityMap[b.priority];
                
                if (sortValue === 'low-to-high') {
                    return priorityA - priorityB;
                } else {
                    return priorityB - priorityA;
                }
            });
        }
        
        // Boş liste mesajını kontrol et
        if (filteredTasks.length === 0) {
            emptyListMessage.style.display = 'block';
        } else {
            emptyListMessage.style.display = 'none';
            
            // Her bir görevi listeye ekle
            filteredTasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
                taskItem.dataset.id = task.id;
                
                taskItem.innerHTML = `
                    <div class="task-content">
                        <div class="task-title">${task.title}</div>
                        ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
                        <div class="task-priority priority-${task.priority}">Öncelik: ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</div>
                    </div>
                    <div class="task-actions">
                        <button class="btn-complete">${task.completed ? 'Tamamlandı ✓' : 'Tamamla'}</button>
                        <button class="btn-delete">Sil</button>
                    </div>
                `;
                
                taskList.appendChild(taskItem);
            });
        }
    }
    
    // Event delegation ile görev listesini dinleme
    taskList.addEventListener('click', function(event) {
        // Event bubbling'i önle
        event.stopPropagation();
        
        const target = event.target;
        
        // Tıklanan elemanın üst görev öğesini bul
        const taskItem = target.closest('.task-item');
        if (!taskItem) return;
        
        const taskId = taskItem.dataset.id;
        
        // Tamamla butonuna tıklandıysa
        if (target.classList.contains('btn-complete')) {
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.completed = !task.completed;
                renderTasks();
            }
        }
        
        // Sil butonuna tıklandıysa
        if (target.classList.contains('btn-delete')) {
            tasks = tasks.filter(task => task.id !== taskId);
            renderTasks();
        }
    });
    
    // Filtreleme: Sadece tamamlananlar
    showCompletedBtn.addEventListener('click', function() {
        filterMode = 'completed';
        renderTasks();
        
        // Aktif filtre butonunu vurgula
        showCompletedBtn.style.opacity = 1;
        showAllBtn.style.opacity = 0.6;
    });
    
    // Filtreleme: Tümünü göster
    showAllBtn.addEventListener('click', function() {
        filterMode = 'all';
        renderTasks();
        
        // Aktif filtre butonunu vurgula
        showCompletedBtn.style.opacity = 0.6;
        showAllBtn.style.opacity = 1;
    });
    
    // Sıralama değiştiğinde
    sortPrioritySelect.addEventListener('change', function() {
        renderTasks();
    });
    
    // Sayfa yüklendiğinde boş listeyi göster
    renderTasks();
});