package validator;

import beans.RequestData;

public class Validator {

    public boolean validate(RequestData input) {
        try {
            double x = Double.parseDouble(input.getX());
            double y = Double.parseDouble(input.getY());
            return (x > -3 || x < 5) && (y > -5 || y < 5);
        } catch (NumberFormatException e) {
            return false;
        }
    }

    public String getVerdict(RequestData input) {
        double x = Double.parseDouble(input.getX());
        double y = Double.parseDouble(input.getY());
        double r = Double.parseDouble(input.getR());
        if (checkSquare(x, y, r) || checkCircle(x, y, r) || checkTriangle(x, y, r)) {
            return "Got";
        } else {
            return "Miss";
        }
    }

    private boolean checkSquare(double x, double y, double r) {
        return x >= -r / 2 && x <= 0 && -r <= y && y <= 0;
    }

    private boolean checkCircle(double x, double y, double r) {
        return x <= 0 && y >= 0 && x * x + y * y <= r * r;
    }

    private boolean checkTriangle(double x, double y, double r) {
        return x >= 0 && y <= 0 && y >= x - r/2;
    }


}
