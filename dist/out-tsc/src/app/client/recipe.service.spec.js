"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var recipe_service_1 = require("./recipe.service");
describe('RecipeService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [recipe_service_1.RecipeService]
        });
    });
    it('should be created', testing_1.inject([recipe_service_1.RecipeService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=recipe.service.spec.js.map