class MinimumCarsRequired {
  // Helper to check if total seats are enough
  private static checkCapacity(P: number[], S: number[]): string | boolean {
    const totalPeople = P.reduce((a, b) => a + b, 0);
    const totalSeats = S.reduce((a, b) => a + b, 0);
    return totalSeats >= totalPeople;
  }
  /*
      Solution 1
  */
  static solution1(P: number[], S: number[]): number | string {
    if (!this.checkCapacity(P, S)) {
      return 'Not enough cars, please add more cars.';
    }

    const totalPeople = P.reduce((acc, curr) => acc + curr, 0);
    const seats = [...S].sort((a, b) => b - a);

    let usedSeats = 0;
    let carsUsed = 0;

    for (let seat of seats) {
      usedSeats += seat;
      carsUsed++;
      if (usedSeats >= totalPeople) {
        return carsUsed;
      }
    }

    return carsUsed;
  }

  /*
  solution 2
*/
  static solution2(P: number[], S: number[]): number | string {
    // Check if total seats are enough
    const totalSeats = S.reduce((a, b) => a + b, 0);
    const totalPeople = P.reduce((a, b) => a + b, 0);

    if (totalSeats < totalPeople) {
      return 'Not enough cars, please add more cars.';
    }

    // Pair people and seats for each car
    const cars = P.map((people, index) => ({ people, seats: S[index] }));

    // Sort cars by seat capacity (largest to smallest)
    cars.sort((a, b) => b.seats - a.seats);

    let remainingPeople = totalPeople;
    let carsUsed = 0;

    // Deduct seats from total people
    for (const car of cars) {
      remainingPeople -= car.seats;
      carsUsed++;

      if (remainingPeople <= 0) {
        return carsUsed; // Loop will always return
      }
    }

    // Fallback (should never happen)
    return carsUsed;
  }

  /*
    Solution 3
*/
  static solution3(P: number[], S: number[]): number | string {
    const totalPeople = P.reduce((acc, curr) => acc + curr, 0);
    const totalSeats = S.reduce((a, b) => a + b, 0);

    // Check if there are enough seats
    if (totalSeats < totalPeople) {
      return 'Not enough cars, please add more cars.';
    }

    const n = S.length;
    const seatsSorted = [...S].sort((a, b) => b - a);

    // Test combinations using k cars (1 to n)
    for (let k = 1; k <= n; k++) {
      const sum = seatsSorted.slice(0, k).reduce((a, b) => a + b, 0);
      if (sum >= totalPeople) {
        return k;
      }
    }

    return n;
  }
}
console.log('Solution1', MinimumCarsRequired.solution1([1, 4, 1], [1, 5, 1]));
console.log('Solution2', MinimumCarsRequired.solution2([2, 3, 5], [4, 2, 3]));
console.log('Solution2', MinimumCarsRequired.solution3([2, 3, 5], [4, 2, 3]));
