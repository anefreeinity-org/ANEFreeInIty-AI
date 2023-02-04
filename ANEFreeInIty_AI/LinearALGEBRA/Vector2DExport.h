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