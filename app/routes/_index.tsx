import { useStore } from "@nanostores/react";
import type { MetaFunction } from "@remix-run/cloudflare";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { ArrowUp } from "lucide-react";
import { nanoid } from "nanoid";
import { atom, computed, map } from "nanostores";
import { Drawer } from "vaul";
import { Button } from "~/components/ui/button";
import { RecipeIdeasMetadataOutput } from "~/models/more-recipes.model";

export const meta: MetaFunction = () => {
  return [{ title: "KitchenCraft" }];
};

const promptOpen$ = atom(true);
const inputValue$ = atom("");

// Create a cached element for height calculations
let cachedTextArea: HTMLTextAreaElement | null = null;

const textareaHeight$ = computed(inputValue$, (value) => {
  if (typeof window === "undefined") return "auto"; // Handle SSR

  if (!cachedTextArea) {
    cachedTextArea = document.createElement("textarea");
    cachedTextArea.style.height = "auto";
    cachedTextArea.style.position = "absolute";
    cachedTextArea.style.visibility = "hidden";
    cachedTextArea.style.width = "100%"; // Match the width of your actual textarea
    cachedTextArea.style.padding = "12px"; // Match the padding of your actual textarea
    document.body.appendChild(cachedTextArea);
  }

  cachedTextArea.value = value;
  const height = cachedTextArea.scrollHeight;

  const MAX_HEIGHT = 300;

  return `${Math.max(40, Math.min(MAX_HEIGHT, height))}px`;
});

// Define the base message interface
interface BaseMessage {
  id: string;
  threadId: string;
  sender: string;
}

// Define the plain message type
interface PlainMessage extends BaseMessage {
  type: "plain";
  body: string;
}

interface InstantRecipeMessage extends BaseMessage {
  type: "instant_recipe";
  recipe: RecipeIdeasMetadataOutput;
  sender: string;
}

// Define the union type for all message types
type Message = PlainMessage | InstantRecipeMessage; // In the future, add more types here

// Message cache store
const messageCache$ = map<Record<string, Message>>({});

// Threads store
const threads$ = map<Record<string, string[]>>({});

export default function Homepage() {
  const promptOpen = useStore(promptOpen$);
  const inputValue = useStore(inputValue$);
  const textareaHeight = useStore(textareaHeight$);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const messageId = searchParams.get("messageId");

  const messages = useStore(messageCache$);
  const threadsStore = useStore(threads$);

  // Get the current thread's messages
  const currentThreadMessages = messageId
    ? (threadsStore[messages[messageId]?.threadId] || [])
        .map((id) => messages[id])
        .filter(Boolean)
    : [];

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Kitchen Craft</div>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        {currentThreadMessages.map((message, index) => (
          <div
            key={message.id}
            className={`mb-2 p-2 rounded-lg max-w-[70%] ${
              message.sender === "user"
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-gray-200 text-black"
            }`}
          >
            {message.type === "plain" && message.body}
          </div>
        ))}
      </div>

      <Drawer.Root open={promptOpen} onOpenChange={promptOpen$.set}>
        <Drawer.Portal>
          <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0 border-t-2 border-gray-200">
            <div className="p-4 flex-1 overflow-auto">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
              <div className="max-w-md mx-auto relative">
                <textarea
                  className="w-full p-3 pr-12 border rounded-md resize-none overflow-hidden"
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => inputValue$.set(e.target.value)}
                  style={{ height: textareaHeight }}
                />
                {inputValue.trim() !== "" && (
                  <Button
                    className="absolute top-2 right-2 p-2 text-blue-500 hover:text-blue-600 transition-colors"
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      const newMessageId = nanoid();
                      const threadId = messageId
                        ? messages[messageId]?.threadId
                        : newMessageId;

                      const newMessage: Message = {
                        id: newMessageId,
                        threadId,
                        sender: "user",
                        type: "plain",
                        body: inputValue,
                      };

                      messageCache$.setKey(newMessageId, newMessage);

                      if (threadId === newMessageId) {
                        threads$.setKey(threadId, [newMessageId]);
                      } else {
                        const currentThread = threadsStore[threadId] || [];
                        threads$.setKey(threadId, [
                          ...currentThread,
                          newMessageId,
                        ]);
                      }

                      console.log("Submitted:", newMessage);
                      navigate(`?messageId=${newMessageId}`);
                      inputValue$.set("");
                    }}
                  >
                    <ArrowUp />
                  </Button>
                )}
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
