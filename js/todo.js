const addGlobalSectionBtn = document.getElementById("add-global-section-btn");
const globalSectionTitle = document.getElementById("global-section-title");
const globalSectionsContainer = document.getElementById(
  "global-sections-container",
);
const addDayBtn = document.getElementById("add-day-btn");
const daysContainer = document.getElementById("days-container");

let globalSections = JSON.parse(localStorage.getItem("globalSections")) || [];
let days = JSON.parse(localStorage.getItem("days")) || [];

function renderGlobalSections() {
  globalSectionsContainer.innerHTML = "";
  globalSections.forEach((section, sectionIndex) => {
    const sectionDiv = document.createElement("div");
    sectionDiv.className = "section";

    const sectionHeader = document.createElement("div");
    sectionHeader.className = "section-header";

    const title = document.createElement("h3");
    title.textContent = section.title;

    const sectionButtons = document.createElement("div");
    sectionButtons.className = "section-buttons";

    const upBtn = document.createElement("button");
    upBtn.textContent = "↑";
    upBtn.onclick = () => moveGlobalSection(sectionIndex, -1);

    const downBtn = document.createElement("button");
    downBtn.textContent = "↓";
    downBtn.onclick = () => moveGlobalSection(sectionIndex, 1);

    const deleteSectionBtn = document.createElement("button");
    deleteSectionBtn.textContent = "Delete";
    deleteSectionBtn.className = "delete-btn";
    deleteSectionBtn.onclick = () => deleteGlobalSection(sectionIndex);

    sectionButtons.appendChild(upBtn);
    sectionButtons.appendChild(downBtn);
    sectionButtons.appendChild(deleteSectionBtn);

    sectionHeader.appendChild(title);
    sectionHeader.appendChild(sectionButtons);

    const progress = calculateProgress(section.todos);
    const progressBar = createProgressBar(progress);

    const todoInput = document.createElement("div");
    todoInput.className = "todo-input";
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Add a new todo...";
    const addBtn = document.createElement("button");
    addBtn.textContent = "Add";
    addBtn.onclick = () => {
      addGlobalTodo(sectionIndex, input.value);
      input.value = "";
    };

    todoInput.appendChild(input);
    todoInput.appendChild(addBtn);

    const todoList = document.createElement("ul");
    todoList.className = "todo-list";
    section.todos.forEach((todo, todoIndex) => {
      const li = document.createElement("li");
      li.className = "todo-item" + (todo.completed ? " completed" : "");

      const span = document.createElement("span");
      span.className = "todo-text";
      span.textContent = todo.text;

      const completeBtn = document.createElement("button");
      completeBtn.className = "complete-btn";
      completeBtn.textContent = todo.completed ? "Undo" : "Complete";
      completeBtn.onclick = () => toggleGlobalComplete(sectionIndex, todoIndex);

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => deleteGlobalTodo(sectionIndex, todoIndex);

      li.appendChild(span);
      li.appendChild(completeBtn);
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });

    sectionDiv.appendChild(sectionHeader);
    sectionDiv.appendChild(progressBar);
    sectionDiv.appendChild(todoInput);
    sectionDiv.appendChild(todoList);
    globalSectionsContainer.appendChild(sectionDiv);
  });
}

function renderDays() {
  daysContainer.innerHTML = "";
  days.forEach((day, dayIndex) => {
    const details = document.createElement("details");
    details.className = "day-card";

    const summary = document.createElement("summary");

    const dateSpan = document.createElement("span");
    dateSpan.className = "date";
    dateSpan.textContent = day.date;

    const deleteDayBtn = document.createElement("button");
    deleteDayBtn.className = "delete-day-btn";
    deleteDayBtn.textContent = "Delete Day";
    deleteDayBtn.onclick = (e) => {
      e.preventDefault();
      deleteDay(dayIndex);
    };

    summary.appendChild(dateSpan);
    summary.appendChild(deleteDayBtn);
    details.appendChild(summary);

    const dayContent = document.createElement("div");
    dayContent.className = "day-content";

    const addSectionDiv = document.createElement("div");
    addSectionDiv.className = "add-section";
    const sectionInput = document.createElement("input");
    sectionInput.type = "text";
    sectionInput.placeholder = "Enter section title...";
    const addSectionBtn = document.createElement("button");
    addSectionBtn.textContent = "Add Section";
    addSectionBtn.onclick = () => {
      addSection(dayIndex, sectionInput.value);
      sectionInput.value = "";
    };
    addSectionDiv.appendChild(sectionInput);
    addSectionDiv.appendChild(addSectionBtn);
    dayContent.appendChild(addSectionDiv);

    const sectionsContainer = document.createElement("div");
    sectionsContainer.className = "sections-container";
    day.sections.forEach((section, sectionIndex) => {
      const sectionDiv = document.createElement("div");
      sectionDiv.className = "section";

      const sectionHeader = document.createElement("div");
      sectionHeader.className = "section-header";

      const title = document.createElement("h3");
      title.textContent = section.title;

      const sectionButtons = document.createElement("div");
      sectionButtons.className = "section-buttons";

      const upBtn = document.createElement("button");
      upBtn.textContent = "↑";
      upBtn.onclick = () => moveSection(dayIndex, sectionIndex, -1);

      const downBtn = document.createElement("button");
      downBtn.textContent = "↓";
      downBtn.onclick = () => moveSection(dayIndex, sectionIndex, 1);

      const deleteSectionBtn = document.createElement("button");
      deleteSectionBtn.textContent = "Delete";
      deleteSectionBtn.className = "delete-btn";
      deleteSectionBtn.onclick = () => deleteSection(dayIndex, sectionIndex);

      sectionButtons.appendChild(upBtn);
      sectionButtons.appendChild(downBtn);
      sectionButtons.appendChild(deleteSectionBtn);

      sectionHeader.appendChild(title);
      sectionHeader.appendChild(sectionButtons);

      const progress = calculateProgress(section.todos);
      const progressBar = createProgressBar(progress);

      const todoInput = document.createElement("div");
      todoInput.className = "todo-input";
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Add a new todo...";
      const addBtn = document.createElement("button");
      addBtn.textContent = "Add";
      addBtn.onclick = () => {
        addTodo(dayIndex, sectionIndex, input.value);
        input.value = "";
      };

      todoInput.appendChild(input);
      todoInput.appendChild(addBtn);

      const todoList = document.createElement("ul");
      todoList.className = "todo-list";
      section.todos.forEach((todo, todoIndex) => {
        const li = document.createElement("li");
        li.className = "todo-item" + (todo.completed ? " completed" : "");

        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = todo.text;

        const completeBtn = document.createElement("button");
        completeBtn.className = "complete-btn";
        completeBtn.textContent = todo.completed ? "Undo" : "Complete";
        completeBtn.onclick = () =>
          toggleComplete(dayIndex, sectionIndex, todoIndex);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTodo(dayIndex, sectionIndex, todoIndex);

        li.appendChild(span);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
      });

      sectionDiv.appendChild(sectionHeader);
      sectionDiv.appendChild(progressBar);
      sectionDiv.appendChild(todoInput);
      sectionDiv.appendChild(todoList);
      sectionsContainer.appendChild(sectionDiv);
    });

    dayContent.appendChild(sectionsContainer);
    details.appendChild(dayContent);
    daysContainer.appendChild(details);
  });
}

function calculateProgress(todos) {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  return {
    completed,
    total,
    percentage: total > 0 ? (completed / total) * 100 : 0,
  };
}

function createProgressBar(progress) {
  const bar = document.createElement("div");
  bar.className = "progress-bar";
  const fill = document.createElement("div");
  fill.className = "progress-fill";
  fill.style.width = progress.percentage + "%";
  const text = document.createElement("span");
  text.textContent = `${progress.completed}/${progress.total}`;
  bar.appendChild(fill);
  bar.appendChild(text);
  return bar;
}

function addGlobalSection() {
  const title = globalSectionTitle.value.trim();
  if (title) {
    globalSections.push({ title, todos: [] });
    globalSectionTitle.value = "";
    saveData();
    renderGlobalSections();
  }
}

function addGlobalTodo(sectionIndex, text) {
  const trimmedText = text.trim();
  if (trimmedText) {
    globalSections[sectionIndex].todos.push({
      text: trimmedText,
      completed: false,
    });
    saveData();
    renderGlobalSections();
  }
}

function toggleGlobalComplete(sectionIndex, todoIndex) {
  globalSections[sectionIndex].todos[todoIndex].completed =
    !globalSections[sectionIndex].todos[todoIndex].completed;
  saveData();
  renderGlobalSections();
}

function deleteGlobalTodo(sectionIndex, todoIndex) {
  globalSections[sectionIndex].todos.splice(todoIndex, 1);
  saveData();
  renderGlobalSections();
}

function deleteGlobalSection(index) {
  globalSections.splice(index, 1);
  saveData();
  renderGlobalSections();
}

function moveGlobalSection(index, direction) {
  const newIndex = index + direction;
  if (newIndex >= 0 && newIndex < globalSections.length) {
    [globalSections[index], globalSections[newIndex]] = [
      globalSections[newIndex],
      globalSections[index],
    ];
    saveData();
    renderGlobalSections();
  }
}

function addDay() {
  const date = new Date().toLocaleDateString();
  days.push({ date, sections: [] });
  saveData();
  renderDays();
}

function addSection(dayIndex, title) {
  const trimmedTitle = title.trim();
  if (trimmedTitle) {
    days[dayIndex].sections.push({ title: trimmedTitle, todos: [] });
    saveData();
    renderDays();
  }
}

function addTodo(dayIndex, sectionIndex, text) {
  const trimmedText = text.trim();
  if (trimmedText) {
    days[dayIndex].sections[sectionIndex].todos.push({
      text: trimmedText,
      completed: false,
    });
    saveData();
    renderDays();
  }
}

function toggleComplete(dayIndex, sectionIndex, todoIndex) {
  days[dayIndex].sections[sectionIndex].todos[todoIndex].completed =
    !days[dayIndex].sections[sectionIndex].todos[todoIndex].completed;
  saveData();
  renderDays();
}

function deleteTodo(dayIndex, sectionIndex, todoIndex) {
  days[dayIndex].sections[sectionIndex].todos.splice(todoIndex, 1);
  saveData();
  renderDays();
}

function deleteSection(dayIndex, sectionIndex) {
  days[dayIndex].sections.splice(sectionIndex, 1);
  saveData();
  renderDays();
}

function moveSection(dayIndex, sectionIndex, direction) {
  const sections = days[dayIndex].sections;
  const newIndex = sectionIndex + direction;
  if (newIndex >= 0 && newIndex < sections.length) {
    [sections[sectionIndex], sections[newIndex]] = [
      sections[newIndex],
      sections[sectionIndex],
    ];
    saveData();
    renderDays();
  }
}

function deleteDay(index) {
  days.splice(index, 1);
  saveData();
  renderDays();
}

function saveData() {
  localStorage.setItem("globalSections", JSON.stringify(globalSections));
  localStorage.setItem("days", JSON.stringify(days));
}

addGlobalSectionBtn.addEventListener("click", addGlobalSection);
globalSectionTitle.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addGlobalSection();
  }
});
addDayBtn.addEventListener("click", addDay);

renderGlobalSections();
renderDays();
