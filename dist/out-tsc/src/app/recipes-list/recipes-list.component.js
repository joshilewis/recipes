"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var recipe_service_1 = require("../client/recipe.service");
var RecipesListComponent = /** @class */ (function () {
    function RecipesListComponent(recipeClient) {
        this.recipeClient = recipeClient;
    }
    RecipesListComponent.prototype.ngOnInit = function () { };
    RecipesListComponent = __decorate([
        core_1.Component({
            selector: "app-recipes-list",
            templateUrl: "./recipes-list.component.html",
            styleUrls: ["./recipes-list.component.css"]
        }),
        __metadata("design:paramtypes", [recipe_service_1.RecipeService])
    ], RecipesListComponent);
    return RecipesListComponent;
}());
exports.RecipesListComponent = RecipesListComponent;
//# sourceMappingURL=recipes-list.component.js.map