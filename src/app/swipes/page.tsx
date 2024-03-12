import { Frown } from "lucide-react";

import { getSwipes } from "@/actions/get-swipes";
import { User } from "@/types";
import { Swipe } from "@/components/swipes/swipe";

export default function Swipes() {
  const swipes: User[] = [];
  let error: string | undefined = undefined;
  let success: string | undefined = undefined;

  const loadSwipes = (amount: number) => {
    getSwipes(amount).then((data) => {
      console.log(data);

      const {
        success: successMessage,
        error: errorMessage,
        users,
      } = data || {};

      success = successMessage;
      error = errorMessage;
      swipes.push(...(users || []));
    });
  };

  if (swipes.length === 0 && !error) {
    loadSwipes(5);
    if (swipes.length === 0) {
      error = "No swipes found";
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-4 relative">
      {swipes.length > 0 && success ? (
        <Swipe initSwipes={swipes} />
      ) : (
        <div className="flex w-full h-full mt-4 flex-col items-center justify-center">
          <Frown size={48} />
          <h2 className="text-3xl">{error}</h2>
        </div>
      )}
    </main>
  );
}
