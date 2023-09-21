<template>
    <div class="grix xs1 lg2 gutter-xs3">
        <div>
            <p class="font-s4 bd-b-solid bd-2 bd-white pb-2 mt-0">Instructions</p>
            <div v-for="(instruction, i) in recipeStore.recipeEdit.instructions" class="d-flex fx-col mb-5">
                <ax-form-field label="Title">
                    <ax-form-control tag="input" v-model="instruction.title" type="text"></ax-form-control>
                </ax-form-field>
                <ax-form-field label="Description">
                    <ax-form-control tag="textarea" v-model="instruction.description" type="text"></ax-form-control>
                </ax-form-field>
                <ax-btn @click="removeInstruction(i)" class="red font-s2 d-block ml-auto rounded-3 px-5 py-1">
                    DELETE
                </ax-btn>
            </div>
        </div>
        <div class="p-4">
            <ax-form-field label="Title">
                <ax-form-control tag="input" v-model="instruction.title" type="text"></ax-form-control>
            </ax-form-field>
            <ax-form-field label="Description">
                <ax-form-control tag="textarea" v-model="instruction.description" type="text"></ax-form-control>
            </ax-form-field>
            <ax-btn :disabled="!instruction.title.length || !instruction.description.length"
                @click="addInstructionToEditRecipe()"
                class="btn my-5 primary rounded-3 px-5 py-2 text-white d-block mx-auto">ADD</ax-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRecipeStore } from "../../stores/recipes";

const recipeStore = useRecipeStore();

const instruction = ref({
    title: "",
    description: "",
});

const addInstructionToEditRecipe = () => {
    instruction.value.title = instruction.value.title.trim()
    instruction.value.description = instruction.value.description.trim();
    
    if (!instruction.value.title.length || !instruction.value.description.length) return;

    recipeStore.addInstructionToEditRecipe(instruction.value);
    instruction.value = {
        title: "",
        description: "",
    };
};

const removeInstruction = (index: number) => {
    recipeStore.recipeEdit.instructions.splice(index, 1);
}
</script>