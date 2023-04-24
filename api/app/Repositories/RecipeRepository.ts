import { inject } from "@adonisjs/core/build/standalone";
import Database from "@ioc:Adonis/Lucid/Database";
import Instruction from "App/Models/Instruction";
import Recipe from "App/Models/Recipe";

@inject()
export default class RecipeRepository {
    public async index() {
        // const recipes = await Recipe.all();
        const recipes = await Recipe.query()
            .preload('recipeCategory')
            .preload('recipeType')
            .preload('user');

        return recipes;
    }

    public async getRegistrations(_period: string) {
        const recipes = await Database.rawQuery(
            `
                SELECT 
                DATE_TRUNC('${_period}', created_at) as x, 
                  COUNT(*) as y 
                FROM recipes 
                GROUP BY x
                ORDER BY x
            `
        );

        return recipes.rows;
    }

    public async getRecipesPer(_period: string) {
        const recipes = await Database.rawQuery(
            `
                SELECT 
                (DATE_TRUNC('${_period}', created_at)) as x,
                COUNT(*) as y 
                FROM recipes 
                GROUP BY x
                ORDER BY x
            `);

        let total = 0;

        const data = recipes.rows.map((row: { x: string; y: string }) => {
            total += parseInt(row.y);

            return {
                x: row.x,
                y: total,
            };
        });

        return data;
    }

    private convertToSeconds(_time: string) {
        const times = _time.split(':');
        return +times[0] * 3600 + +times[1] * 60;
    }

    public async insert(_body) {
        try {
            const recipe = await this.createRecipe(_body.recipe.recipe);

            await this.createRecipeInstructions(recipe.id, _body.recipe.instructions);
            await this.createRecipeIngredients(recipe, _body.recipe.ingredients)

            return recipe;
        } catch (err) {
            return err
        }
    }

    private async createRecipe(_recipe) {
        try {
            const recipe = new Recipe();

            _recipe.preparationTime = this.convertToSeconds(_recipe.preparationTime);
            _recipe.cookingTime = this.convertToSeconds(_recipe.cookingTime);
            _recipe.eatersAmount = +_recipe.eatersAmount

            await recipe.fill(_recipe).save();

            return recipe
        } catch (err) {
            return err
        }
    }

    private async createRecipeInstructions(_recipe_id, _instructions) {
        try {
            _instructions.map(async inst => {
                const instruction = new Instruction();

                const inst_to_save = {
                    title: inst.title,
                    description: inst.description,
                    recipe_id: _recipe_id
                }

                await instruction.fill(inst_to_save).save();
            })
        } catch (err) {
            return err
        }
    }

    private async createRecipeIngredients(_recipe, _ingredients) {
        try {
            _ingredients.map(async ing => {
                const ingr = {
                    amount: ing.amount,
                    unit: ing.unit,
                }

                await _recipe.related('ingredients').sync({ [ing.id]: ingr }, false)
            })
        } catch (err) {
            return err
        }
    }

    private async updateRecipeIngredients(_recipe, _ingredients) {

        console.log('ingrediets', _ingredients)
        try {
            _ingredients.map(async ing => {
                const ingr = {
                    amount: ing.amount,
                    unit: ing.unit,
                }

                await _recipe.related('ingredients').sync({ [ing.id]: ingr }, true)
            })
        } catch (err) {
            return err
        }
    }

    public async find(_id: string) {
        const recipe = await Recipe.query()
            .where('id', _id)
            .preload('ingredients', (query) => {
                query.pivotColumns(['amount', 'unit'])
            }).firstOrFail();

        return recipe;
    }

    public async update(_id, _body) {
        try {
            await Recipe.query().where("id", _id).update({
                name: _body.recipe.name,
                description: _body.recipe.description,
                preparationTime: this.convertToSeconds(_body.recipe.preparation_time),
                cookingTime: this.convertToSeconds(_body.recipe.cooking_time),
                difficulty: _body.recipe.difficulty,
                eatersAmount: +_body.recipe.eaters_amount,
                userId: _body.recipe.userId,
                recipeTypeId: _body.recipe.recipe_type_id,
                recipeCategoryId: _body.recipe.recipe_category_id,
            });

            const recipe = await Recipe.findOrFail(_id);

            await this.updateRecipeIngredients(recipe, _body.recipe.ingredients)

            _body.recipe.instructions.map(async inst => {
                console.log(inst.id)
                await Instruction.query().where('recipe_id', recipe.id).delete()
            })
            await this.createRecipeInstructions(recipe.id, _body.recipe.instructions)

        } catch (err) {
            console.error(err)
            return err
        }
    }

    public async delete(_id) {
        try {
            const recipe = await Recipe.findOrFail(_id);
            await recipe.delete();

            return { msg: "recipe deleted" }
        } catch (err) {
            return err
        }
    }
}