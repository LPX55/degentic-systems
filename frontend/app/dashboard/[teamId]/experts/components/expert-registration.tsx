"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ExpertRegistration() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Thank You!</CardTitle>
          <CardDescription>
            We've received your application to join our expert panel. We'll review your credentials and get back to you soon.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register as an Expert</CardTitle>
        <CardDescription>
          Help evaluate and improve AI debate quality by joining our expert panel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Dr. Jane Smith" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="jane.smith@example.com" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="expertise">Primary Domain of Expertise</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select domain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ai-ethics">AI Ethics</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="climate">Climate & Sustainability</SelectItem>
                <SelectItem value="economics">Economics</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="social-science">Social Science</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="credentials">Credentials & Experience</Label>
            <Textarea 
              id="credentials" 
              placeholder="Please describe your relevant experience, qualifications, and publications..."
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="motivation">Why do you want to join?</Label>
            <Textarea 
              id="motivation" 
              placeholder="Tell us why you're interested in evaluating AI debates..."
              className="min-h-[100px]"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Submit Application
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}