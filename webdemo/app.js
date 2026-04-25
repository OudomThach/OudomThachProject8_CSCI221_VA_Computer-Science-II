const samples = {
    int: {
        label: "Integer item",
        placeholder: "Enter a number",
        items: [10, 20, 30],
        capacity: 4,
        parser(value) {
            const trimmed = value.trim();
            if (trimmed === "" || !/^-?\d+$/.test(trimmed)) {
                return { ok: false, message: "Enter a whole number." };
            }

            return { ok: true, value: Number(trimmed) };
        }
    },
    string: {
        label: "String item",
        placeholder: "Enter text",
        items: ["Oudom", "Thach"],
        capacity: 4,
        parser(value) {
            const trimmed = value.trim();
            if (trimmed === "") {
                return { ok: false, message: "Enter a non-empty string." };
            }

            return { ok: true, value: trimmed };
        }
    }
};

const state = {
    activeType: "int",
    sets: {
        int: createSetState(samples.int),
        string: createSetState(samples.string)
    },
    lastArrayText: "Click toArray to create a copied array."
};

const tabs = document.querySelectorAll(".tab");
const input = document.querySelector("#item-input");
const inputLabel = document.querySelector("#input-label");
const sizeValue = document.querySelector("#size-value");
const capacityValue = document.querySelector("#capacity-value");
const resultValue = document.querySelector("#result-value");
const arrayView = document.querySelector("#array-view");
const arrayOutput = document.querySelector("#array-output");

document.querySelector("#add-button").addEventListener("click", () => handleAction("add"));
document.querySelector("#remove-button").addEventListener("click", () => handleAction("remove"));
document.querySelector("#contains-button").addEventListener("click", () => handleAction("contains"));
document.querySelector("#array-button").addEventListener("click", exportArray);
document.querySelector("#reset-button").addEventListener("click", resetActiveSet);

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleAction("add");
    }
});

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        state.activeType = tab.dataset.type;
        state.lastArrayText = "Click toArray to create a copied array.";
        input.value = "";
        updateView(`Switched to Set<${state.activeType}>.`);
    });
});

updateView("Ready");

const autoElements = {
    step: document.querySelector("#auto-step-value"),
    type: document.querySelector("#auto-type-value"),
    action: document.querySelector("#auto-action-value"),
    detail: document.querySelector("#auto-detail-value"),
    size: document.querySelector("#auto-size-value"),
    capacity: document.querySelector("#auto-capacity-value"),
    result: document.querySelector("#auto-result-value"),
    array: document.querySelector("#auto-array-view"),
    log: document.querySelector("#auto-log-output"),
    restart: document.querySelector("#auto-restart-button")
};

const autoPlayback = {
    index: 0,
    typeName: "Set<int>",
    items: [],
    capacity: 4,
    log: [],
    timer: null
};

const autoSteps = [
    {
        typeName: "Set<int>",
        title: "Create integer set",
        code: "Set<int> numbers;",
        run() {
            resetAutoState("Set<int>");
            return "Empty Set<int> created.";
        }
    },
    createAutoAddStep("Set<int>", 10, "numbers.add(10);"),
    createAutoAddStep("Set<int>", 20, "numbers.add(20);"),
    createAutoAddStep("Set<int>", 30, "numbers.add(30);"),
    createAutoAddStep("Set<int>", 20, "numbers.add(20);"),
    {
        typeName: "Set<int>",
        title: "Return integer count",
        code: "numbers.getCurrentSize();",
        run() {
            return `Current number of integer items: ${autoPlayback.items.length}.`;
        }
    },
    createAutoContainsStep("Set<int>", 20, "numbers.contains(20);"),
    createAutoContainsStep("Set<int>", 99, "numbers.contains(99);"),
    createAutoRemoveStep("Set<int>", 20, "numbers.remove(20);"),
    createAutoRemoveStep("Set<int>", 99, "numbers.remove(99);"),
    {
        typeName: "Set<int>",
        title: "Return dynamic integer array",
        code: "int* numberArray = numbers.toArray();",
        run() {
            return `Copied array contains: [${autoPlayback.items.map(formatItem).join(", ")}].`;
        }
    },
    {
        typeName: "Set<int>",
        title: "Deallocate integer array",
        code: "delete[] numberArray;",
        run() {
            return "Caller deallocates the dynamic array.";
        }
    },
    {
        typeName: "Set<std::string>",
        title: "Create string set",
        code: "Set<std::string> names;",
        run() {
            resetAutoState("Set<std::string>");
            return "Empty Set<std::string> created.";
        }
    },
    createAutoAddStep("Set<std::string>", "Oudom", 'names.add("Oudom");'),
    createAutoAddStep("Set<std::string>", "Thach", 'names.add("Thach");'),
    createAutoAddStep("Set<std::string>", "Oudom", 'names.add("Oudom");'),
    {
        typeName: "Set<std::string>",
        title: "Return string count",
        code: "names.getCurrentSize();",
        run() {
            return `Current number of string items: ${autoPlayback.items.length}.`;
        }
    },
    createAutoContainsStep("Set<std::string>", "Oudom", 'names.contains("Oudom");')
];

if (autoElements.restart) {
    autoElements.restart.addEventListener("click", startAutoPlayback);
    startAutoPlayback();
}

function createSetState(sample) {
    return {
        items: [...sample.items],
        capacity: sample.capacity
    };
}

function activeSet() {
    return state.sets[state.activeType];
}

function handleAction(action) {
    const sample = samples[state.activeType];
    const parsed = sample.parser(input.value);

    if (!parsed.ok) {
        updateView(parsed.message);
        return;
    }

    const set = activeSet();
    const item = parsed.value;
    const exists = set.items.some((current) => current === item);

    if (action === "add") {
        if (exists) {
            updateView(`${formatItem(item)} was not added because it is already in the set.`);
            return;
        }

        if (set.items.length === set.capacity) {
            set.capacity *= 2;
        }

        set.items.push(item);
        state.lastArrayText = "Click toArray to create a copied array.";
        updateView(`${formatItem(item)} was added.`);
        input.value = "";
        return;
    }

    if (action === "remove") {
        if (!exists) {
            updateView(`${formatItem(item)} was not removed because it was not found.`);
            return;
        }

        set.items = set.items.filter((current) => current !== item);
        state.lastArrayText = "Click toArray to create a copied array.";
        updateView(`${formatItem(item)} was removed.`);
        input.value = "";
        return;
    }

    if (action === "contains") {
        updateView(`${formatItem(item)} member check: ${exists ? "yes" : "no"}.`);
    }
}

function exportArray() {
    const set = activeSet();
    const typeName = state.activeType === "int" ? "int" : "std::string";
    const values = set.items.map(formatItem).join(", ");

    state.lastArrayText = `${typeName}* arrayCopy = new ${typeName}[${set.items.length}];\narrayCopy contains: [${values}]\ndelete[] arrayCopy;`;
    updateView(`toArray returned ${set.items.length} copied item${set.items.length === 1 ? "" : "s"}.`);
}

function resetActiveSet() {
    const sample = samples[state.activeType];
    state.sets[state.activeType] = createSetState(sample);
    state.lastArrayText = "Click toArray to create a copied array.";
    input.value = "";
    updateView(`Sample Set<${state.activeType}> restored.`);
}

function updateView(message) {
    const sample = samples[state.activeType];
    const set = activeSet();

    tabs.forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.type === state.activeType);
    });

    inputLabel.textContent = sample.label;
    input.placeholder = sample.placeholder;
    input.inputMode = state.activeType === "int" ? "numeric" : "text";
    sizeValue.textContent = String(set.items.length);
    capacityValue.textContent = String(set.capacity);
    resultValue.textContent = message;
    arrayOutput.textContent = state.lastArrayText;
    renderArray(set);
}

function renderArray(set) {
    arrayView.innerHTML = "";

    for (let index = 0; index < set.capacity; index += 1) {
        const cell = document.createElement("div");
        const used = index < set.items.length;

        cell.className = `cell${used ? " used" : ""}`;
        cell.innerHTML = `
            <span class="cell-index">index ${index}</span>
            <span class="cell-value">${used ? escapeHtml(formatItem(set.items[index])) : "empty"}</span>
        `;

        arrayView.appendChild(cell);
    }
}

function formatItem(item) {
    return typeof item === "string" ? `"${item}"` : String(item);
}

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function startAutoPlayback() {
    if (autoPlayback.timer) {
        clearInterval(autoPlayback.timer);
    }

    autoPlayback.index = 0;
    autoPlayback.log = [];
    autoPlayback.items = [];
    autoPlayback.capacity = 4;
    autoPlayback.typeName = "Set<int>";
    runNextAutoStep();
    autoPlayback.timer = setInterval(runNextAutoStep, 2100);
}

function runNextAutoStep() {
    if (autoPlayback.index >= autoSteps.length) {
        autoPlayback.index = 0;
        autoPlayback.log = [];
    }

    const step = autoSteps[autoPlayback.index];
    const result = step.run();
    const logLine = `${String(autoPlayback.index + 1).padStart(2, "0")}. ${step.code} -> ${result}`;

    autoPlayback.typeName = step.typeName;
    autoPlayback.log.push(logLine);
    renderAutoStep(step, result);
    autoPlayback.index += 1;
}

function resetAutoState(typeName) {
    autoPlayback.typeName = typeName;
    autoPlayback.items = [];
    autoPlayback.capacity = 4;
}

function createAutoAddStep(typeName, item, code) {
    return {
        typeName,
        title: `Add ${formatItem(item)}`,
        code,
        run() {
            const exists = autoPlayback.items.some((current) => current === item);

            if (exists) {
                return `${formatItem(item)} was not added because it is already in the set.`;
            }

            if (autoPlayback.items.length === autoPlayback.capacity) {
                autoPlayback.capacity *= 2;
            }

            autoPlayback.items.push(item);
            return `${formatItem(item)} was added.`;
        }
    };
}

function createAutoRemoveStep(typeName, item, code) {
    return {
        typeName,
        title: `Remove ${formatItem(item)}`,
        code,
        run() {
            const index = autoPlayback.items.findIndex((current) => current === item);

            if (index === -1) {
                return `${formatItem(item)} was not removed because it was not found.`;
            }

            autoPlayback.items.splice(index, 1);
            return `${formatItem(item)} was removed.`;
        }
    };
}

function createAutoContainsStep(typeName, item, code) {
    return {
        typeName,
        title: `Check ${formatItem(item)}`,
        code,
        run() {
            const exists = autoPlayback.items.some((current) => current === item);
            return `${formatItem(item)} member check: ${exists ? "yes" : "no"}.`;
        }
    };
}

function renderAutoStep(step, result) {
    autoElements.step.textContent = `Step ${autoPlayback.index + 1} of ${autoSteps.length}`;
    autoElements.type.textContent = step.typeName;
    autoElements.action.textContent = step.title;
    autoElements.detail.textContent = step.code;
    autoElements.size.textContent = String(autoPlayback.items.length);
    autoElements.capacity.textContent = String(autoPlayback.capacity);
    autoElements.result.textContent = result;
    autoElements.log.textContent = autoPlayback.log.join("\n");
    renderAutoArray();
}

function renderAutoArray() {
    autoElements.array.innerHTML = "";

    for (let index = 0; index < autoPlayback.capacity; index += 1) {
        const cell = document.createElement("div");
        const used = index < autoPlayback.items.length;

        cell.className = `auto-cell${used ? " used" : ""}`;
        cell.innerHTML = `
            <span class="cell-index">index ${index}</span>
            <span class="cell-value">${used ? escapeHtml(formatItem(autoPlayback.items[index])) : "empty"}</span>
        `;

        autoElements.array.appendChild(cell);
    }
}
