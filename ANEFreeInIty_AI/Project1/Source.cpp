#include <iostream>
#include "Vector2D.h"

int main()
{
	//Add

	std::cout << "Add two vectors" << std::endl;
	Vector2D* va1 = new Vector2D(6, -2);
	va1->PrintVector();
	Vector2D* va2 = new Vector2D(-4, 4);
	va2->PrintVector();
	Vector2D* vresa = *va1 + *va2;
	vresa->PrintVector();

	//Scaler mal

	std::cout << "Scaler multiplication with vector" << std::endl;
	Vector2D* vm = new Vector2D(-4, 4);
	vm->PrintVector();
	Vector2D* vresm = Vector2D::SMul(-3,*vm);
	vresm->PrintVector();

	//Substract

	std::cout << "Substruct two vectors" << std::endl;
	Vector2D* vs1 = new Vector2D(2, 4);
	vs1->PrintVector();
	Vector2D* vs2 = new Vector2D(-1, -2);
	vs2->PrintVector();
	Vector2D* vress = *vs1 - *vs2;
	vress->PrintVector();

	//unit vector

	std::cout << "Unit Vectors" << std::endl;
	Vector2D::i()->PrintVector();
	Vector2D::j()->PrintVector();

	std::cout << "Unit Vector representation of a vector" << std::endl;
	Vector2D::UnitVector(new Vector2D(3, 4))->PrintVector();
}