#include <iostream>
#include "Vector2D.h"

int main()
{
	////Add

	//std::cout << "Add two vectors" << std::endl;
	//Vector2D* va1 = new Vector2D(6, -2);
	//va1->PrintVector();
	//Vector2D* va2 = new Vector2D(-4, 4);
	//va2->PrintVector();
	//Vector2D* vresa = *va1 + *va2;
	//vresa->PrintVector();

	////Scaler mal

	//std::cout << "Scaler multiplication with vector" << std::endl;
	//Vector2D* vm = new Vector2D(-4, 4);
	//vm->PrintVector();
	//Vector2D* vresm = Vector2D::ScalerMultiplication(-3,*vm);
	//vresm->PrintVector();

	////Substract

	//std::cout << "Substruct two vectors" << std::endl;
	//Vector2D* vs1 = new Vector2D(2, 4);
	//vs1->PrintVector();
	//Vector2D* vs2 = new Vector2D(-1, -2);
	//vs2->PrintVector();
	//Vector2D* vress = *vs1 - *vs2;
	//vress->PrintVector();

	////unit vector

	//std::cout << "Unit Vectors" << std::endl;
	//Vector2D::i()->PrintVector();
	//Vector2D::j()->PrintVector();

	//std::cout << "Unit Vector representation of a vector" << std::endl;
	//Vector2D::UnitVector(new Vector2D(3, 4))->PrintVector();

	////vector addition (polar frame of ref)

	//std::cout << "Add two vectors(polar frame of ref:)" << std::endl;
	//Vector2D* vap1 = new Vector2D(3, 310, false);
	//vap1->PrintVector();
	//vap1->PrintVectorP();
	//Vector2D* vap2 = new Vector2D(8, 190, false);
	//vap2->PrintVector();
	//vap2->PrintVectorP();
	//Vector2D* vresap = *vap1 + *vap2;
	//vresap->PrintVector();
	//vresap->PrintVectorP();

	/*Vector2D* v1 = new Vector2D(1.928, -2.298);
	v1->PrintVector();
	v1->PrintVectorP();

	Vector2D* v = new Vector2D(-7.88, -1.39);
	v->PrintVector();
	v->PrintVectorP();*/

	Vector2D* v1 = new Vector2D(2, 1);
	v1->PrintVector();

	Vector2D* v = new Vector2D(0, 3);
	v->PrintVector();

	Vector2D::IntersectLineByVectors(v1, v, 5);
}