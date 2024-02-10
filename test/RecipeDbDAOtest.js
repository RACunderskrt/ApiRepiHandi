import { Recipe } from '../Recipe.js'
import { Product } from '../../Product/Product.js'
import { DAODbFactory } from '../../Factory/Factory.js'
import { openDb } from '../../Database/db.js'


const lasagna = new Recipe("Lasagna", "This is why I love Italy", 45)
let coffee = new Product("Coffee", "Bean", 4)
let mascarpone = new Product("Mascarpone", "Cheese", 45)
const tiramisu = new Recipe("Tiramisu", "Best dessert lets goooooooooo", 180, 64)


test('Test findById : id non existant', async () => {
  const factory = new DAODbFactory(await openDb())
  const recipesRequests = factory.createRecipeDAO()

  await expect(recipesRequests.findById(0)).rejects.toThrow('Error : The recipe you are looking for does not exist');
});

test('Test findByName : nom non existant', async () => {
  const factory = new DAODbFactory(await openDb())
  const recipesRequests = factory.createRecipeDAO()

  await expect(recipesRequests.findByName('evbezsbeaqsveq')).rejects.toThrow('Error : The recipe you are looking for does not exist');
});

test('Test insert : recette ajoutée', async () => {
  const factory = new DAODbFactory(await openDb())
  const recipesRequests = factory.createRecipeDAO()

  lasagna.id_recipe= await recipesRequests.getNewId()
  await recipesRequests.insert(lasagna);
  expect(await recipesRequests.findAll()).toContainEqual(lasagna);
});

test('Test findById : recette = Lasagna', async () => {
  const factory = new DAODbFactory(await openDb())
  const recipesRequests = factory.createRecipeDAO()

  const data = await recipesRequests.findById(lasagna.getId());
  expect(data).toEqual(lasagna);
});

test('Test findByName : recette = Lasagna', async () => {
  const factory = new DAODbFactory(await openDb())
  const recipesRequests = factory.createRecipeDAO()
  
  const data = await recipesRequests.findByName('laSAgNa');
  expect(data).toEqual(lasagna);
});

test('Test update : recette modifiée', async () => {
  const factory = new DAODbFactory(await openDb())
  const recipesRequests = factory.createRecipeDAO()

  let recipe = await recipesRequests.findByName("lasagna")
  recipe.setTime(50)
  await recipesRequests.update(recipe)
  const data = await recipesRequests.findByName("lasagna")
  expect(data.getTime()).toBe(50);
});

test('Test delete : recette supprimée', async () => {
  const factory = new DAODbFactory(await openDb())
  const recipesRequests = factory.createRecipeDAO()

  await recipesRequests.delete(lasagna)
  const data = await recipesRequests.findAll()
  expect(data).not.toContain(lasagna);
});