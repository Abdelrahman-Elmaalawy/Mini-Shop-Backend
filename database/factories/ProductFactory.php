<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        $categories = ['mobile', 'watch'];

        $name = fake()->unique()->words(3, true);
        return [
            'name' => $name,
            'slug' => Str::slug($name) . '-' . fake()->unique()->numberBetween(1000,9999),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 100, 2000),
            'image_url' => 'https://picsum.photos/seed/' . fake()->uuid() . '/600/800',
            'stock' => fake()->numberBetween(0, 100),
            'category' => fake()->randomElement($categories), // 👈
        ];
    }
}
