#include "pch.h"
#include "Vector2DExport.h"
#include <iostream>

void* CreateVector2D(double param1, double param2, bool isCartesian)
{
	return (void*) new Vector2D(param1, param2, isCartesian);
}

double Vector2DGetX(Vector2D* vector)
{
	std::tuple<double, double> retVal = vector->GetVector2D();
	double param1 = std::get<0>(retVal);

	return param1;
}

double Vector2DGetY(Vector2D* vector)
{
	std::tuple<double, double> retVal = vector->GetVector2D();
	double param2 = std::get<1>(retVal);
	return param2;
}

double Vector2DGetMagnitude(Vector2D* vector)
{
	std::tuple<double, double> retVal = vector->GetVectorP2D();
	int param1 = std::get<0>(retVal);
	return param1;
}

double Vector2DGetAngleWithXAxisDeg(Vector2D* vector)
{
	std::tuple<double, double> retVal = vector->GetVectorP2D();
	int param2 = std::get<1>(retVal);
	return param2;
}

void aCat(const char* val1, const char* val2, char* res)
{
	std::string str = std::string(val1) + std::string(val2);

	strcpy(res, str.c_str());
}

void* AddVector2D(double vectors[], int length, bool isCartesian)
{
	Vector2D* vect1 = new Vector2D(vectors[0], vectors[1]);
	Vector2D* vect2 = new Vector2D(vectors[2], vectors[3]);
	Vector2D* vectRes = *vect1 + *vect2;
	
	for (int i = 4; i < length - 1; i += 2)
	{
		Vector2D* vect = new Vector2D(vectors[i], vectors[i+1]);
		vectRes = *vectRes + *vect;
	}

	return (void*)vectRes;
}

void* SubVector2D(double vectors[], int length, bool isCartesian)
{
	Vector2D* vect1 = new Vector2D(vectors[0], vectors[1]);
	Vector2D* vect2 = new Vector2D(vectors[2], vectors[3]);
	Vector2D* vectRes = *vect1 - *vect2;

	for (int i = 4; i < length - 1; i += 2)
	{
		Vector2D* vect = new Vector2D(vectors[i], vectors[i + 1]);
		vectRes = *vectRes - *vect;
	}

	return (void*)vectRes;
}

void* ScalerMultiplication(double sVal, Vector2D& vector)
{
	return (void*) Vector2D::ScalerMultiplication(sVal, vector);
}

double* GetAllLinearCombinations(Vector2D* vector1, Vector2D* vector2, double x, double y, int length, double scale)
{
	double* returnPack = new double[length];

	Vector2D* vArr[] = { vector1, vector2 };

	if(Vector2D::ISLinearlyDependent(vector1, vector1)) 
	{
		int count = 0;
		for (double i = -x; i < x; i+= scale)
		{
			for (double j = -y; j < y; j+= scale)
			{
				double cons[] = { i, j };
				Vector2D* mulVector = Vector2D::LinearCombinationVector(vArr, cons, 2);
				
				returnPack[count++] = Vector2DGetX(mulVector);
				returnPack[count++] = Vector2DGetY(mulVector);

				if (count+1 > length)
				{
					return returnPack;
				}
			}
		}
	}
	return returnPack;
}

void* Vector2DDotProduct(Vector2D* vector1, Vector2D* vector2)
{
	return (void*)Vector2D::DotProductVector2D(vector1, vector2);
}