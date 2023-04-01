#pragma once
#include <string>
#include <cstring>
#include "Vector2D.h"

extern "C" _declspec(dllexport) void* CreateVector2D(double param1, double param2, bool isCartesian);

extern "C" _declspec(dllexport) double Vector2DGetX(Vector2D * vector);

extern "C" _declspec(dllexport) double Vector2DGetY(Vector2D * vector);

extern "C" _declspec(dllexport) double Vector2DGetMagnitude(Vector2D * vector);

extern "C" _declspec(dllexport) double Vector2DGetAngleWithXAxisDeg(Vector2D * vector);

extern "C" _declspec(dllexport) void aCat(const char* val1, const char* val2, char* res);

extern "C" _declspec(dllexport) void* AddVector2D(double vectors[], int length, bool isCartesian);

extern "C" _declspec(dllexport) void* SubVector2D(double vectors[], int length, bool isCartesian);

extern "C" _declspec(dllexport) void* ScalerMultiplication(double sVal, Vector2D & vector);

extern "C" _declspec(dllexport) double* GetAllLinearCombinations(Vector2D * vector1, Vector2D * vector2, double x, double y);