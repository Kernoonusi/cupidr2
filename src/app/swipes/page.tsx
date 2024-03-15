import { Frown } from "lucide-react";

import { getSwipes } from "@/actions/get-swipes";
import { User } from "@/types";
import { Swipe } from "@/components/swipes/swipe";

export default async function Swipes() {
  let swipes: User[] = [];
  let error: string | undefined = undefined;
  let success: string | undefined = undefined;

  const loadSwipes = async (amount: number) => {
    try {
      const {
        success: successMessage,
        error: errorMessage,
        users,
      } = await getSwipes(amount);

      success = successMessage;
      error = errorMessage;
      swipes = users || [];
    } catch (error) {
      console.error("Error loading swipes:", error);
    }
  };

  if (swipes.length === 0 && !error) {
    await loadSwipes(5);
    console.log(swipes);

    if (swipes.length === 0) {
      error = "No swipes found";
    }
  }

  return (
    <main className="max-w-xl mx-auto px-4 relative">
      {swipes.length > 0 ? (
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
