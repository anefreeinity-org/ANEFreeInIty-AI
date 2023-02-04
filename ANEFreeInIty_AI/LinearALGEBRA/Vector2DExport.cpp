#include "pch.h"
#include "Vector2DExport.h"

void* CreateVector2D(double param1, double param2, bool isCartesian)
{
	return (void*) new Vector2D(param1, param2, isCartesian);
}

double Vector2DGetX(Vector2D* vector)
{
	std::tuple<double, double> retVal = vector->GetVector2D();
	int param1 = std::get<0>(retVal);

	return param1;
}

double Vector2DGetY(Vector2D* vector)
{
	std::tuple<double, double> retVal = vector->GetVector2D();
	int param2 = std::get<1>(retVal);
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