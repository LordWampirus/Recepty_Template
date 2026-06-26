const pagesContainer = document.getElementById("pagesContainer");
const addPageButton = document.getElementById("addPageButton");
const removePageButton = document.getElementById("removePageButton")

const useDescriptionCheckbox = document.getElementById("useDescriptionCheckbox");
const descriptionEditorField = document.getElementById("descriptionEditorField");
const printRecipeButton = document.getElementById("printRecipeButton");

const ingredientsEditorList = document.getElementById("ingredientsEditorList");
const addIngredientButton = document.getElementById("addIngredientButton");

const stepsEditorList = document.getElementById("stepsEditorList");
const addStepButton = document.getElementById("addStepButton");

const generateRecipeButton = document.getElementById("generateRecipeButton");

const recipeTitleInput = document.getElementById("recipeTitleInput");
const recipeDescriptionInput = document.getElementById("recipeDescriptionInput");

const previewRecipeTitle = document.getElementById("previewRecipeTitle");
const previewRecipeDescription = document.getElementById("previewRecipeDescription");
const previewIngredientsList = document.getElementById("previewIngredientsList");
const previewStepsList = document.getElementById("previewStepsList");

const resetRecipeButton = document.getElementById("resetRecipeButton");

const emptyRecipe = {
    title: "",
    useDescription: false,
    description: "",
    ingredients: [
        { amount: "", name: "" }
    ],
    steps: [
        ""
    ]
};

resetRecipeButton.addEventListener("click", function () {
    clearRecipe();
});

useDescriptionCheckbox.addEventListener("change", function () {
    if (useDescriptionCheckbox.checked) {
        descriptionEditorField.style.display = "block";
    } else {
        descriptionEditorField.style.display = "none";
    }
});

generateRecipeButton.addEventListener("click", function () {
    updateRecipePreview();
});

printRecipeButton.addEventListener("click", function () {
    window.print();
});

/*
addPageButton.addEventListener("click", function () {
    const existingContinuationPage = document.querySelector(".continuation-page");

    if (existingContinuationPage) {
        return;
    }

    createSecondPage();
});

removePageButton.addEventListener("click", function () {
    removeSecondPage();
});
*/

addIngredientButton.addEventListener("click", function () {
    addIngredientRow();
});

ingredientsEditorList.addEventListener("click", function (event) {
    if (!event.target.classList.contains("remove-row-button")) {
        return;
    }

    const ingredientRows = ingredientsEditorList.querySelectorAll(".ingredient-editor-row");

    if (ingredientRows.length <= 1) {
        return;
    }

    const row = event.target.closest(".ingredient-editor-row");
    row.remove();
});

addStepButton.addEventListener("click", function (event) {
    addStepRow();
});

stepsEditorList.addEventListener("click", function (event) {
    if (!event.target.classList.contains("remove-row-button")) {
        return;
    }

    const stepRows = stepsEditorList.querySelectorAll(".step-editor-row");

    if (stepRows.length <= 1) {
        return;
    }

    const row = event.target.closest(".step-editor-row");
    row.remove();

    updateStepNumbers();
});

function createSecondPage() {
    const page = document.createElement("main");
    page.classList.add("page", "continuation-page");

    const recipeCard = document.createElement("article");
    recipeCard.classList.add("recipe-card");

    recipeCard.innerHTML = `
    <header class="continuation-header">
      <h2 class="continuation-title">Pokračování receptu</h2>
    </header>

    <section class="section continuation-ingredients-section" id="previewIngredientsSectionPage2">
      <h2 class="section-title">Suroviny — pokračování</h2>

      <div class="ingredients-list" id="previewIngredientsListPage2"></div>
    </section>

    <section class="section section-steps continuation-steps-section">
      <div class="steps-grid" id="previewStepsListPage2">
        <h2 class="section-title steps-title">Postup — pokračování</h2>
      </div>
    </section>
    `;

    page.appendChild(recipeCard);
    pagesContainer.appendChild(page);

    return page;
}

function removeSecondPage() {
    const continuationPages = document.querySelectorAll(".continuation-page");

    continuationPages.forEach(function (page) {
    page.remove();
  });
}

function createIngredientRow(amount = "", name = "") {
    const ingredientRow = document.createElement("div");
    ingredientRow.classList.add("editor-row", "ingredient-editor-row");

    ingredientRow.innerHTML = `
        <input 
        type="text" 
        class="ingredient-amount-input" 
        placeholder="Množství"
        value="${amount}"
        >

        <input 
        type="text" 
        class="ingredient-name-input" 
        placeholder="Název suroviny"
        value="${name}"
        >

        <button type="button" class="remove-row-button">Odebrat</button>
    `;

    return ingredientRow;
}

function addIngredientRow() {
    const ingredientRow = createIngredientRow();
    ingredientsEditorList.insertBefore(ingredientRow, addIngredientButton);
}

function createStepRow(text = "") {
    const stepRow = document.createElement("div");
    stepRow.classList.add("editor-row", "step-editor-row");

    stepRow.innerHTML = `
    <span class="step-editor-number">01</span>

    <textarea 
        class="step-text-input" 
        rows="3" 
        placeholder="Text kroku..."
    >${text}</textarea>

    <button type="button" class="remove-row-button">Odebrat</button>
  `;

    return stepRow;
}

function addStepRow() {
    const stepRow = createStepRow();
    stepsEditorList.insertBefore(stepRow, addStepButton);

    updateStepNumbers();
}

function updateStepNumbers() {
    const stepRows = stepsEditorList.querySelectorAll(".step-editor-row");

    stepRows.forEach(function (row, index) {
    const numberElement = row.querySelector(".step-editor-number");

    if (!numberElement) {
      return;
    }

    numberElement.textContent = String(index + 1).padStart(2, "0");
  });
}

function updateRecipePreview() {
    removeSecondPage();

    updatePreviewTitle();
    updatePreviewDescription();
    updatePreviewIngredients();
    updatePreviewSteps();

    handlePreviewOverflow();
}

function updatePreviewTitle() {
    const title = recipeTitleInput.value.trim();

    if (title === "") {
        previewRecipeTitle.textContent = "Název receptu";
        return;
    }

    previewRecipeTitle.textContent = title;
}

function updatePreviewDescription() {
    const description = recipeDescriptionInput.value.trim();

    if (!useDescriptionCheckbox.checked || description === "") {
        previewRecipeDescription.style.display = "none";
        return;
    }

    previewRecipeDescription.style.display = "block";
    previewRecipeDescription.textContent = description;
}

function updatePreviewIngredients() {
    const ingredientRows = ingredientsEditorList.querySelectorAll(".ingredient-editor-row");

    previewIngredientsList.innerHTML = "";

    ingredientRows.forEach(function (row) {
    const amountInput = row.querySelector(".ingredient-amount-input");
    const nameInput = row.querySelector(".ingredient-name-input");

    const amount = amountInput.value.trim();
    const name = nameInput.value.trim();

    if (amount === "" && name === "") {
      return;
    }

    const previewRow = document.createElement("div");
    previewRow.classList.add("ingredient-row");

    previewRow.innerHTML = `
      <span class="ingredient-amount">${amount}</span>
      <span class="ingredient-name">${name}</span>
    `;

    previewIngredientsList.appendChild(previewRow);
  });
}

function updatePreviewSteps() {
    const firstStepsSection = previewStepsList.closest(".section-steps");

    if (firstStepsSection) {
        firstStepsSection.style.display = "block";
    }

    const stepRows = stepsEditorList.querySelectorAll(".step-editor-row");

    previewStepsList.innerHTML = "";

    const stepsTitle = document.createElement("h2");
    stepsTitle.classList.add("section-title", "steps-title");
    stepsTitle.textContent = "Postup";

    previewStepsList.appendChild(stepsTitle);

    stepRows.forEach(function (row, index) {
        const stepTextInput = row.querySelector(".step-text-input");
        const stepText = stepTextInput.value.trim();

        if (stepText === "") {
        return;
    }

    const step = document.createElement("div");
    step.classList.add("step");

    const stepTextParagraph = document.createElement("p");
    stepTextParagraph.classList.add("step-text");

    const stepNumber = document.createElement("span");
    stepNumber.classList.add("step-number");
    stepNumber.textContent = String(index + 1).padStart(2, "0");

    stepTextParagraph.appendChild(stepNumber);
    stepTextParagraph.appendChild(document.createTextNode(stepText));

    step.appendChild(stepTextParagraph);
    previewStepsList.appendChild(step);
  });
}

function clearRecipe() {
    recipeTitleInput.value = emptyRecipe.title;

    useDescriptionCheckbox.checked = emptyRecipe.useDescription;
    recipeDescriptionInput.value = emptyRecipe.description;

    if (emptyRecipe.useDescription) {
        descriptionEditorField.style.display = "block";
    } else {
        descriptionEditorField.style.display = "none";
    }

    clearIngredientsEditor();
    clearStepsEditor();

    removeSecondPage();
    updateStepNumbers();
    updateRecipePreview();
}

function clearIngredientsEditor() {
    const ingredientRows = ingredientsEditorList.querySelectorAll(".ingredient-editor-row");

    ingredientRows.forEach(function (row) {
        row.remove();
    });

    emptyRecipe.ingredients.forEach(function (ingredient) {
        const ingredientRow = createIngredientRow(ingredient.amount, ingredient.name);
        ingredientsEditorList.insertBefore(ingredientRow, addIngredientButton);
    });
}

function clearStepsEditor() {
    const stepRows = stepsEditorList.querySelectorAll(".step-editor-row");

    stepRows.forEach(function (row) {
        row.remove();
    });

    emptyRecipe.steps.forEach(function (stepText) {
        const stepRow = createStepRow(stepText);
        stepsEditorList.insertBefore(stepRow, addStepButton);
    });
}

function handlePreviewOverflow() {
    const firstRecipeCard = document.querySelector(".page:not(.continuation-page) .recipe-card");
    const firstStepsGrid = document.getElementById("previewStepsList");

    if (!firstRecipeCard || !firstStepsGrid) {
        return;
    }

    setStepsGridHeight(firstRecipeCard, firstStepsGrid);

    const firstIngredientsSection = previewIngredientsList.closest(".section");

    const needsContinuation =
        isElementOutsideCard(firstIngredientsSection, firstRecipeCard) ||
        isElementOutsideCard(firstStepsGrid, firstRecipeCard) ||
        isStepsGridOverflowing(firstStepsGrid);

    if (!needsContinuation) {
        updateStepsSectionVisibility(firstStepsGrid);
        return;
    }

    createSecondPage();

    const secondRecipeCard = document.querySelector(".continuation-page .recipe-card");
    const previewIngredientsListPage2 = document.getElementById("previewIngredientsListPage2");
    const previewStepsListPage2 = document.getElementById("previewStepsListPage2");
    const previewIngredientsSectionPage2 = document.getElementById("previewIngredientsSectionPage2");

    moveOverflowContentToSecondPage(
        firstRecipeCard,
        firstStepsGrid,
        previewIngredientsListPage2,
        previewStepsListPage2
    );

    setStepsGridHeight(firstRecipeCard, firstStepsGrid);
    setStepsGridHeight(secondRecipeCard, previewStepsListPage2);

    updateSecondPageVisibility(previewIngredientsListPage2, previewIngredientsSectionPage2);
}

function moveOverflowContentToSecondPage(
    firstRecipeCard,
    firstStepsGrid,
    previewIngredientsListPage2,
    previewStepsListPage2
) {
    let safetyCounter = 0;

    const firstIngredientsSection = previewIngredientsList.closest(".section");

    /*
        1. Suroviny přesouváme jen tehdy,
        když samotná sekce surovin leze mimo rámeček.
    */
    while (
        isElementOutsideCard(firstIngredientsSection, firstRecipeCard) &&
        previewIngredientsList.querySelectorAll(".ingredient-row").length > 1
    ) {
        safetyCounter++;

        if (safetyCounter > 100) {
        console.warn("Přesouvání surovin bylo zastaveno.");
        break;
    }

    const ingredientRows = previewIngredientsList.querySelectorAll(".ingredient-row");
    const lastIngredient = ingredientRows[ingredientRows.length - 1];
    const firstIngredientOnSecondPage = previewIngredientsListPage2.querySelector(".ingredient-row");

    previewIngredientsListPage2.insertBefore(lastIngredient, firstIngredientOnSecondPage);
  }

  /*
    2. Potom nastavíme výšku postupu podle místa,
    které zůstalo na první stránce.
  */
    setStepsGridHeight(firstRecipeCard, firstStepsGrid);

  /*
    3. Pokud přetéká postup, přesouváme pouze kroky postupu.
  */
    while (
        isElementOutsideCard(firstStepsGrid, firstRecipeCard) ||
        isStepsGridOverflowing(firstStepsGrid)
    ) {
        safetyCounter++;

        if (safetyCounter > 100) {
        console.warn("Přesouvání postupu bylo zastaveno.");
        break;
        }

        const stepRows = previewStepsList.querySelectorAll(".step");

        if (stepRows.length === 0) {
        updateStepsSectionVisibility(firstStepsGrid);
        break;
        }

        const lastStep = stepRows[stepRows.length - 1];
        const firstStepOnSecondPage = previewStepsListPage2.querySelector(".step");

        previewStepsListPage2.insertBefore(lastStep, firstStepOnSecondPage);

        setStepsGridHeight(firstRecipeCard, firstStepsGrid);
  }

    updateStepsSectionVisibility(firstStepsGrid);
    updateStepsSectionVisibility(previewStepsListPage2);
}

function updateSecondPageVisibility(
    previewIngredientsListPage2,
    previewIngredientsSectionPage2
    ) {
    const hasIngredientsOnSecondPage =
        previewIngredientsListPage2.querySelectorAll(".ingredient-row").length > 0;

    if (hasIngredientsOnSecondPage) {
        previewIngredientsSectionPage2.style.display = "block";
    } else {
        previewIngredientsSectionPage2.style.display = "none";
    }
}

function updateStepsGridHeight(recipeCard, stepsGrid) {
    if (!recipeCard || !stepsGrid) {
        return;
    }

    const cardRect = recipeCard.getBoundingClientRect();
    const stepsRect = stepsGrid.getBoundingClientRect();

    const availableHeight = cardRect.bottom - stepsRect.top;

    stepsGrid.style.height = `${Math.max(availableHeight, 80)}px`;
}

function isStepsGridOverflowing(stepsGrid) {
    if (!stepsGrid) {
        return false;
    }

    return stepsGrid.scrollWidth > stepsGrid.clientWidth + 1;
}

function isElementOverflowing(element) {
    if (!element) {
        return false;
    }

    return (
        element.scrollHeight > element.clientHeight + 1 ||
        element.scrollWidth > element.clientWidth + 1
    );
}

function isElementOutsideCard(element, card) {
    if (!element || !card) {
        return false;
    }

    const elementRect = element.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    return elementRect.bottom > cardRect.bottom + 1;
}

function isFirstPageOverflowing(firstRecipeCard, firstStepsGrid) {
    return (
        isElementOverflowing(firstRecipeCard) ||
        isElementOverflowing(firstStepsGrid) ||
        isRecipeCardTooTall(firstRecipeCard)
    );
}

function isContentOutsideCard(card) {
    if (!card) {
        return false;
    }

    const cardRect = card.getBoundingClientRect();

    const contentElements = card.querySelectorAll(
        ".header, .section, .ingredients-list, .steps-grid, .step, .ingredient-row"
    );

    for (const element of contentElements) {
        const elementRect = element.getBoundingClientRect();

        if (elementRect.bottom > cardRect.bottom + 1) {
        return true;
        }

        if (elementRect.right > cardRect.right + 1) {
        return true;
        }
    }

    return false;
}

function isRecipeCardTooTall(recipeCard) {
    if (!recipeCard) {
        return false;
    }

    const expectedHeight = recipeCard.clientHeight;
    const realContentHeight = recipeCard.scrollHeight;

    return realContentHeight > expectedHeight + 1;
}

function setStepsGridHeight(recipeCard, stepsGrid) {
    if (!recipeCard || !stepsGrid) {
        return;
    }

    const cardRect = recipeCard.getBoundingClientRect();
    const stepsRect = stepsGrid.getBoundingClientRect();

    const bottomReserve = 12;
    const availableHeight = cardRect.bottom - stepsRect.top - bottomReserve;

    stepsGrid.style.height = `${Math.max(availableHeight, 0)}px`;
}

function isStepsGridOverflowing(stepsGrid) {
    if (!stepsGrid) {
        return false;
    }

    return (
        stepsGrid.scrollWidth > stepsGrid.clientWidth + 1 ||
        stepsGrid.scrollHeight > stepsGrid.clientHeight + 1
    );
}

function updateStepsSectionVisibility(stepsGrid) {
    if (!stepsGrid) {
        return;
    }

    const section = stepsGrid.closest(".section-steps");
    const hasSteps = stepsGrid.querySelectorAll(".step").length > 0;

    if (!section) {
        return;
    }

    section.style.display = hasSteps ? "block" : "none";
}

clearRecipe();