import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function AuthForm({ open, onOpenChange }) {
  const [hasAccount, setHasAccount] = useState(true);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {hasAccount ? "Login" : "Register"}
          </DialogTitle>
          <DialogDescription>
            {hasAccount ? "Enter email and password to login" : "Create new account to manage your trip"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={() => {return}} className="space-y-4">
          <Button
            type="submit"
            className="w-full"
          >
            Submit
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          {hasAccount ? (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setHasAccount(false)}
            >
              Register
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setHasAccount(true)}
            >
              Login
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
