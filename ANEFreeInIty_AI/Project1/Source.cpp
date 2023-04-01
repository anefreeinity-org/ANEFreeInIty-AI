#include <iostream>
#include "VectorV2D.h"
#include <string>
#include <iostream>

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

	//Vector2D* v1 = new Vector2D(2, 1);
	//v1->PrintVector();

	//Vector2D* v2 = new Vector2D(0, 3);
	//v2->PrintVector();

	//Vector2D* v3 = new Vector2D(1, 1);
	//v3->PrintVector();

	//Vector2D* v4 = new Vector2D(5, 0);
	//v4->PrintVector();

	//Vector2D* arr[] = { v1, v2, v3, v4 };

	//double cons[] = { 2,3,5,9 };

	////Vector2D::IntersectLineByVectors(v1, v, 5);
	//Vector2D::LinearCombinationVector(arr, cons, 4)->PrintVector();

	/*Vector2D* v1 = new Vector2D(1, 2);
	v1->PrintVector();

	Vector2D* v2 = new Vector2D(0, 3);
	v2->PrintVector();

	Vector2D* v3 = new Vector2D(2, 2);
	v3->PrintVector();

	std::tuple<double, double> constants = Vector2D::GetConstantsToReachThirdVector(v1, v2, v3);

	double c1 = std::get<0>(constants);
	double c2 = std::get<1>(constants);
	
	std::cout << c1 << ", " << c2 << std::endl;*/

	


	/*int result = Vector2D::ISLinearlyDependent(v1, v2);

	std::cout << result << std::endl;*/
	Vector2D* vector1 = new Vector2D(3, 4);
	vector1->PrintVector();

	Vector2D* vector2 = new Vector2D(7, 10);
	vector2->PrintVector();
	double x = 5;
	double y = 5;

	int length = 8 * x * y;
	double* returnPack = new double[length];

	Vector2D* vArr[] = { vector1, vector2 };

	std::cout << Vector2D::ISLinearlyDependent(vector1, vector1);

	if (Vector2D::ISLinearlyDependent(vector1, vector1))
	{
		std::cout << "ok" << std::endl;
		int count = 0;
		for (double i = -x; i < x; i++)
		{
			for (double j = -y; j < y; j++)
			{
				double cons[] = { i, j };
				Vector2D* mulVector = Vector2D::LinearCombinationVector(vArr, cons, 2);

				std::tuple<double, double> retVal = mulVector->GetVectorP2D();
				//double param2 = std::get<0>(retVal);

				returnPack[count++] = std::get<0>(retVal);
				returnPack[count++] = std::get<1>(retVal);
			}
		}

		for (int i = 0; i < length-1; i+=2)
		{
			std::cout << returnPack[i] << " , " << returnPack[i + 1] << std::endl;
		}
	}
}